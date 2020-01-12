import FileService from "@/services/fileService/file.service";
import HttpService from "@/services/http/http.service";
import DownloadService from "@/services/download/download.service";

import { ApplicationConfig, IPatchConfig } from "@/core/constants";
import { ConfigModule } from "@/store/modules/config/config.store";

const patchURL = "https://titans-league.org/static/downloads/";

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

  async GetPatchesThatNeedsToBeUpdated(): Promise<string[]> {
    const requiresUpdate: string[] = [];
    const patchConfigs = await this.GetPatchConfig();
    if (!patchConfigs || patchConfigs.length === 0) return requiresUpdate;

    const patchSettings = ConfigModule.config!.patchConfig;

    for (const config of patchConfigs) {
      const setting = patchSettings.find(x => x.patch === config.patch);
      if (!setting || !setting.keepUpdated) continue;

      const patch = await FileService.GetFileStats(
        this.getPatchLocation(config.patch)
      );
      if (!patch) {
        requiresUpdate.push(config.patch);
        continue;
      }

      const pTime = new Date(patch.mtime);
      const sTime = new Date(config.modified);
      if (pTime < sTime) {
        requiresUpdate.push(config.patch);
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
      await DownloadService.downloadFileAsync(
        patchURL + patch,
        this.getPatchLocation(patch),
        (pct: number) => {
          callback(patch, pct);
        }
      );
    }
  }
}

export default new PatchService();
