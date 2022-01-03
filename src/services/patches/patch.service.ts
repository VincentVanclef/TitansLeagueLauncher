import FileService from '@/services/fileService/file.service';
import HttpService from '@/services/http/http.service';
import DownloadService from '@/services/download/download.service';

import { ApplicationConfig } from '@/core/constants';
import { ConfigModule } from '@/store/modules/config/config.store';
import LogService from '../logs/log.service';
import { PatchViewModel, PatchViewObject } from '@/types/apiServerContract';

const AdmZip = require("adm-zip");

class PatchService {
    private blizzPatches: string[] = ["common.mpq", "common-2.mpq", "expansion.mpq", "lichking.mpq", "patch.mpq", "patch-2.mpq", "patch-3.mpq"];

    private getPatchLocation(patchName: string) {
        return ConfigModule.config!.wowPath + '\\' + ApplicationConfig.PatchPath + '\\' + patchName;
    }

    async GetPatchConfig(): Promise<PatchViewModel> {
        const result = await HttpService.Get<PatchViewModel>('/patch/GetPatchData', {
            realmId: ConfigModule.config!.selectedRealm
        });
        return result;
    }

    async RemoveObsoletePatches(patches: PatchViewObject[]) {
        const path = ConfigModule.config!.wowPath + '\\' + ApplicationConfig.PatchPath;
        const files = await FileService.ReadDirectoryFiles(path) as string[];
        const patchFiles = patches.map(x => x.patch);

        for (const file of files) {
            if (patchFiles.indexOf(file) < 0 && this.blizzPatches.indexOf(file.toLowerCase()) < 0) {
                try {
                    await FileService.RemoveFile(path + '\\' + file);
                } catch (e) {
                    LogService.Log('RemoveObsoletePatches', e);
                }
            }
        }
    }

    async GetPatchesThatNeedsToBeUpdated(): Promise<PatchViewObject[]> {
        const requiresUpdate: PatchViewObject[] = [];
        const patchConfigs = await this.GetPatchConfig();
        if (!patchConfigs) return requiresUpdate;

        const patchSettings = ConfigModule.config!.patchConfig;

        if (ConfigModule.config?.removeUnusedPatches === true) {
            await this.RemoveObsoletePatches(patchConfigs.patches);
        }

        for (const config of patchConfigs.patches) {
            const setting = patchSettings.find(x => x.patch === config.patch);
            if (!setting || !setting.keepUpdated) continue;

            try {
                const patchMD5 = await FileService.GetFileMD5(this.getPatchLocation(config.patch));
                if (patchMD5 !== config.hash) {
                    requiresUpdate.push(config);
                }
            } catch (e) {
                LogService.Log('GetPatchesThatNeedsToBeUpdated', e);
            }
        }

        return requiresUpdate;
    }

    async UpdatePatches(callback: (fileName: string, percentage: number) => void) {
        const patchesThatNeedsToBeUpdated = await this.GetPatchesThatNeedsToBeUpdated();
        if (patchesThatNeedsToBeUpdated.length === 0) return;

        for (const patch of patchesThatNeedsToBeUpdated) {
            try {
                await DownloadService.downloadFileAsync(patch.downloadLink, this.getPatchLocation(patch.patch), (pct: number) => {
                    callback(patch.patch, pct);
                });
            } catch (e) {
                LogService.Log('UpdatePatches', e);
            }
        }
    }

    async EnsureAIOIsInstalled() {
        const aioPath = ConfigModule.config!.wowPath + '\\' + ApplicationConfig.AddonsPath + "\\AIO_Client";
        const exists = await FileService.ExistsFolder(aioPath);
        if (exists) return;

        try {
            const AIO_Dl_Link = "https://titans-league.org/static/downloads/AIO_Client.zip";
            const AIO_LOC = ConfigModule.config!.wowPath + '\\' + ApplicationConfig.AddonsPath + "\\AIO_Client.zip";
            await DownloadService.downloadFileAsync(AIO_Dl_Link, AIO_LOC);

            var zip = new AdmZip(AIO_LOC);
            zip.extractAllTo(ConfigModule.config!.wowPath + '\\' + ApplicationConfig.AddonsPath, true);

            await FileService.RemoveFile(AIO_LOC);
        } catch (e) {
            LogService.Log('EnsureAIOIsInstalled', e);
        }
    }
}

export default new PatchService();
