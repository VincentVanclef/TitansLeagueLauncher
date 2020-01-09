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
  Baseconfig
} from "@/core/constants";

import FileService, {
  FileFlags,
  FileEncodings
} from "@/services/fileService/file.service";

interface IConfigState {
  configSetupInProcess: boolean;
  configSetupFailed: boolean;
  config?: IConfiguration | null;
  settingsPath?: string | null;
}

@Module({ namespaced: true, dynamic: true, store, name: "ConfigModule" })
class ConfigState extends VuexModule implements IConfigState {
  configSetupInProcess: boolean = false;
  configSetupFailed: boolean = false;
  config?: IConfiguration | null = null;
  settingsPath?: string | null = null;

  @Mutation
  ApplySettings(settings: string) {
    this.config = JSON.parse(settings) as IConfiguration;
    console.log(this.config);
  }

  @Mutation
  SetPath(path: string) {
    this.settingsPath = path;
  }

  @Mutation
  SetConfigSetupProcess(state: boolean) {
    this.configSetupInProcess = state;
  }

  @Mutation
  SetConfigSetupProcessFailure(state: boolean) {
    this.configSetupFailed = state;
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

    try {
      const settings = await FileService.ReadFile(settingsFilePath, {
        encoding: FileEncodings.utf8
      });
      this.ApplySettings(settings);
      this.SetConfigSetupProcess(false);
      return JSON.parse(settings) as IConfiguration;
    } catch (e) {
      console.log(e);
      try {
        const config = JSON.stringify(Baseconfig);
        await FileService.WriteFile(settingsFilePath, config, {
          flags: FileFlags.Writing
        });
        this.ApplySettings(config);
        this.SetConfigSetupProcess(false);
        return Baseconfig;
      } catch (e) {
        console.log(e);
        this.SetConfigSetupProcessFailure(true);
        return null;
      }
    }
  }

  @Action
  async Init() {
    await this.LoadSettingsConfig();
  }
}

const ConfigModule = getModule(ConfigState);

export { ConfigModule, IConfigState };
