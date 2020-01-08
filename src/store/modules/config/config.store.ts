import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
const app = require("electron").remote.app;
import store from "@/store";
import { IConfiguration, ApplicationConfig } from "@/core/constants";

import FileService from "@/services/fileService/file.service";

interface IConfigState {
  config: IConfiguration;
}

@Module({ namespaced: true, dynamic: true, store, name: "ConfigModule" })
class ConfigState extends VuexModule implements IConfigState {
  config!: IConfiguration;

  @Mutation
  ApplySettings(settings: string) {
    this.config = JSON.parse(settings) as IConfiguration;
    console.log(this.config)
  }

  @Action
  async Init() {
    // Ensure config file is present
    const appPath = app.getAppPath();
    const settingsPath = appPath + "/" + ApplicationConfig.SettingsFileName;
    try {
      const settings = await FileService.ReadFile(settingsPath);
      this.ApplySettings(settings);
    } catch (e) {
      const config: IConfiguration = {
        wowPath: "",
        autoCheckForUpdates: false,
        autoClearCache: false
      };

      try {
        await FileService.CreateFile(settingsPath, JSON.stringify(config));
      } catch (e) {
        console.log(e);
      }

      try {
        const file = await FileService.ReadFile(settingsPath);
        console.log(file);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

const ConfigModule = getModule(ConfigState);

export { ConfigModule, IConfigState };
