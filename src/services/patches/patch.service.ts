import FileService from "@/services/fileService/file.service";
import HttpService from "@/services/http/http.service";
import DownloadService from "@/services/download/download.service";

import { ApplicationConfig, IPatchConfig } from "@/core/constants";
import { ConfigModule } from "@/store/modules/config/config.store";
import LogService from "../logs/log.service";

class PatchService {
  private getPatchLocation(patchName: string) {
    return (
      ConfigModule.config!.wowPath +
      "\\" +
      ApplicationConfig.PatchPath +
      "\\" +
      patchName
    );
  }

  async GetPatchConfig(): Promise<IPatchConfig[]> {
    const result = await HttpService.Get<IPatchConfig[]>("/patch/GetPatchData");
    return result;
  }

  async GetPatchesThatNeedsToBeUpdated(): Promise<IPatchConfig[]> {
    const requiresUpdate: IPatchConfig[] = [];
    const patchConfigs = await this.GetPatchConfig();
    if (!patchConfigs || patchConfigs.length === 0) return requiresUpdate;

    const patchSettings = ConfigModule.config!.patchConfig;

    for (const config of patchConfigs) {
      const setting = patchSettings.find(x => x.patch === config.patch);
      if (!setting || !setting.keepUpdated) continue;

      try {
        const patch = await FileService.GetFileStats(
          this.getPatchLocation(config.patch)
        );
        if (!patch) {
          requiresUpdate.push(config);
          continue;
        }

        const pTime = new Date(patch.mtime);
        const sTime = new Date(config.modified);
        if (pTime < sTime) {
          requiresUpdate.push(config);
        }
      } catch (e) {
        LogService.Log("GetPatchesThatNeedsToBeUpdated", e);
      }
    }

    return requiresUpdate;
  }

  async UpdatePatches(
    callback: (fileName: string, percentage: number) => void
  ) {
    const patchesThatNeedsToBeUpdated = await this.GetPatchesThatNeedsToBeUpdated();
    if (patchesThatNeedsToBeUpdated.length === 0) return;

    for (const patch of patchesThatNeedsToBeUpdated) {
      console.log(patch);
      try {
        await DownloadService.downloadFileAsync(
          patch.downloadLink,
          this.getPatchLocation(patch.patch),
          (pct: number) => {
            callback(patch.patch, pct);
          }
        );
      } catch (e) {
        LogService.Log("UpdatePatches", e);
      }
    }
  }
}

export default new PatchService();
