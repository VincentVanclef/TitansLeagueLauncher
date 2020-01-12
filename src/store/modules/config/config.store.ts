import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
const app = require("electron").remote.app;
import store from "@/store";
import {
  IConfiguration,
  ApplicationConfig,
  Baseconfig,
  WoWLocalesArray,
  RealmlistConfig
} from "@/core/constants";

import FileService, {
  FileFlags,
  FileEncodings
} from "@/services/fileService/file.service";
import PatchService from "@/services/patches/patch.service";

interface IConfigState {
  configSetupInProcess: boolean;
  configSetupFailed: boolean;
  config?: IConfiguration | null;
  settingsPath?: string | null;
  isWoWDirectoryValid: boolean;
}

@Module({ namespaced: true, dynamic: true, store, name: "ConfigModule" })
class ConfigState extends VuexModule implements IConfigState {
  configSetupInProcess: boolean = false;
  configSetupFailed: boolean = false;
  config?: IConfiguration | null = null;
  settingsPath?: string | null = null;
  isWoWDirectoryValid: boolean = false;

  @Mutation
  ApplySettings(settings: IConfiguration) {
    this.config = settings;
  }

  @Mutation
  SetPath(path: string) {
    this.settingsPath = path;
  }

  @Mutation
  SetWoWFolderPath(path: string) {
    this.config!.wowPath = path;
  }

  @Mutation
  SetConfigSetupProcess(state: boolean) {
    this.configSetupInProcess = state;
  }

  @Mutation
  SetConfigSetupProcessFailure(state: boolean) {
    this.configSetupFailed = state;
  }

  @Mutation
  SetWoWDirectoryValidState(state: boolean) {
    this.isWoWDirectoryValid = state;
  }

  @Mutation
  SetRealmlistPath(path: string) {
    this.config!.realmlistPath = path;
  }

  @Action
  async SelectWoWPath(): Promise<boolean> {
    const { dialog } = require("electron").remote;
    const path = dialog.showOpenDialog({
      properties: ["openDirectory"]
    });

    if (path) {
      const valid = await this.ValidateWoWDirectory(path[0]);
      this.SetWoWDirectoryValidState(valid);
      if (!valid) return false;

      this.SetWoWFolderPath(path[0]);
      this.SaveConfig();
      return true;
    } else {
      console.log("not found");
      return false;
    }
  }

  @Action
  async ResetRealmlist() {
    await FileService.WriteFile(
      this.config!.realmlistPath,
      `set realmlist ${RealmlistConfig.Realmlist}`
    );
  }

  @Action
  async ClearCache() {
    console.log(this.config!.wowPath + "\\Cache\\WDB");
    try {
      await FileService.RemoveFolder(this.config!.wowPath + "\\Cache\\WDB", {
        recursive: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Action
  async ValidateWoWDirectory(path: string): Promise<boolean> {
    let directory = await FileService.ReadDirectory(path);

    const requiredDirectoryItems: string[] = ["Data", "Wow.exe"];
    const directoryItems: string[] = [];

    for (const file of directory) {
      const fileName = file as string;
      if (requiredDirectoryItems.includes(fileName)) {
        directoryItems.push(fileName);
      }
    }

    if (requiredDirectoryItems.length != directoryItems.length) {
      this.SetWoWDirectoryValidState(false);
      return false;
    }

    // Locate realmlist
    directory = await FileService.GetDirectories(path + "\\Data");
    if (directory.length === 0) return false;

    const locales = WoWLocalesArray();
    const locale = directory.filter(value => locales.includes(value));
    if (locale.length === 0) return false;

    const realmlistPath = path + "\\Data\\" + locale[0] + "\\realmlist.wtf";
    const realmlistExists = await FileService.CheckFile(realmlistPath);
    if (!realmlistExists) {
      await this.ResetRealmlist();
    }

    if (this.config!.realmlistPath !== realmlistPath) {
      this.SetRealmlistPath(realmlistPath);
      await this.SaveConfig();
    }

    this.SetWoWDirectoryValidState(true);
    return true;
  }

  @Action
  async SaveConfig(config: IConfiguration | null = null) {
    if (config) this.ApplySettings(config);
    if (!this.config) return;
    if (!this.settingsPath) return;

    try {
      await FileService.WriteFile(
        this.settingsPath,
        JSON.stringify(this.config)
      );
    } catch (e) {
      console.log(e);
    }
  }

  @Action
  async LoadSettingsConfig(): Promise<IConfiguration | null> {
    this.SetConfigSetupProcess(true);

    // Ensure config file is present
    const appPath = app.getPath("userData");
    const settingsFolderPath = appPath + "/" + ApplicationConfig.SettingsPath;
    const settingsFolderExists = await FileService.ExistsFolder(
      settingsFolderPath
    );
    if (!settingsFolderExists) {
      await FileService.CreateFolder(settingsFolderPath);
    }

    const settingsFilePath =
      settingsFolderPath + "/" + ApplicationConfig.SettingsFileName;

    this.SetPath(settingsFilePath);
    try {
      const settings = await FileService.ReadFileAs<IConfiguration>(
        settingsFilePath
      );
      this.ApplySettings(settings);
      await this.ValidateWoWDirectory(settings.wowPath);
      this.SetConfigSetupProcess(false);
      return settings;
    } catch (e) {
      try {
        const baseConfig = Baseconfig;
        baseConfig.patchConfig = await PatchService.GetPatchConfig();

        for (const config of baseConfig.patchConfig) {
          const number = config.keepUpdated as any;
          config.keepUpdated = number === 1 ? true : false;
        }

        await FileService.WriteObjectToFile(settingsFilePath, baseConfig, {
          flags: FileFlags.Writing
        });
        this.ApplySettings(baseConfig);
        this.SetConfigSetupProcess(false);

        return baseConfig;
      } catch (e) {
        console.log(e);
        this.SetConfigSetupProcessFailure(true);
        return null;
      }
    }
  }

  @Action
  async Init() {
    const result = await this.LoadSettingsConfig();
  }

  @Action
  Clear() {}
}

const ConfigModule = getModule(ConfigState);

export { ConfigModule, IConfigState };
