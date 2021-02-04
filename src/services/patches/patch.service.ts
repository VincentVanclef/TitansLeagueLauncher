import FileService from '@/services/fileService/file.service';
import HttpService from '@/services/http/http.service';
import DownloadService from '@/services/download/download.service';

import { ApplicationConfig, IPatchConfig } from '@/core/constants';
import { ConfigModule } from '@/store/modules/config/config.store';
import LogService from '../logs/log.service';
import { PatchViewModel, PatchViewObject } from '@/types/apiServerContract';

class PatchService {
	private getPatchLocation(patchName: string) {
		return ConfigModule.config!.wowPath + '\\' + ApplicationConfig.PatchPath + '\\' + patchName;
	}

	async GetPatchConfig(): Promise<PatchViewModel> {
		const result = await HttpService.Get<PatchViewModel>('/patch/GetPatchData');
		return result;
	}

	async GetPatchesThatNeedsToBeUpdated(): Promise<PatchViewObject[]> {
		const requiresUpdate: PatchViewObject[] = [];
		const patchConfigs = await this.GetPatchConfig();
		if (!patchConfigs || patchConfigs.patches.length === 0) return requiresUpdate;

		const patchSettings = ConfigModule.config!.patchConfig;

		for (const config of patchConfigs.patches) {
			const setting = patchSettings.find(x => x.patch === config.patch);
			if (!setting || !setting.keepUpdated) continue;

			try {
				const patchMD5 = await FileService.GetFileMD5(this.getPatchLocation(config.patch));
				if (!patchMD5) {
					requiresUpdate.push(config);
					continue;
				}

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
}

export default new PatchService();
