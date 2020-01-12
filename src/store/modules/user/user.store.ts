import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Jwt } from "@/models/jwt/jwt.model";
import { ApplicationUser } from "@/models/user/user.model";
import { UserApi } from "@/services/api/user.api";
import { IUserLoginRequest } from "@/models/user/requests/UserLoginRequest";
import { IUserLoginResponse } from "@/models/user/responses/UserLoginResponse";
import { IUserRegisterRequest } from "@/models/user/requests/UserRegisterRequest";

import JwtService from "@/services/jwt/jwt.service";

import FileService, {
  FileFlags,
  FileEncodings
} from "@/services/fileService/file.service";

import Bus from "@/core/bus";
import { BusConstants, ApplicationConfig } from "@/core/constants";

const app = require("electron").remote.app;

interface IUserState {
  user?: ApplicationUser | null;
  token?: Jwt | null;
}

@Module({ namespaced: true, dynamic: true, store, name: "UserModule" })
class UserState extends VuexModule implements IUserState {
  user: ApplicationUser | null = null;
  token: Jwt | null = null;

  get IsLoggedIn(): boolean {
    return (
      this.user != null && this.token != null && !this.token.IsTokenExpired()
    );
  }

  @Mutation
  HandleLoginResponse(result: IUserLoginResponse) {
    this.user = result.userDto;
    this.token = JwtService.DecodeTokenAsJwt(result.token);
  }

  @Mutation
  SetUser(user: ApplicationUser | null = null) {
    this.user = user;
  }

  @Mutation
  SetToken(token: Jwt | null = null) {
    this.token = token;
  }

  @Action
  async Login(request: IUserLoginRequest): Promise<IUserLoginResponse> {
    const result = await UserApi.Login(request);
    this.HandleLoginResponse(result);
    await this.SaveUserData();
    Bus.emit(BusConstants.OnLogin, result);
    return result;
  }

  @Action
  async Register(request: IUserRegisterRequest): Promise<IUserLoginResponse> {
    const result = await UserApi.Register(request);
    this.HandleLoginResponse(result);
    await this.SaveUserData();
    Bus.emit(BusConstants.OnLogin, result);
    return result;
  }

  @Action
  async Logout() {
    this.Reset();
    await this.SaveUserData();
    Bus.emit(BusConstants.OnLogout);
  }

  @Action
  async RefreshToken(): Promise<boolean> {
    return true;
  }

  @Action
  async SaveUserData() {
    const appPath = app.getPath("userData");
    const settingsFolderPath = appPath + "/" + ApplicationConfig.SettingsPath;
    const settingsFolderExists = await FileService.ExistsFolder(
      settingsFolderPath
    );
    if (!settingsFolderExists) {
      await FileService.CreateFolder(settingsFolderPath);
    }

    const userFilePath =
      settingsFolderPath + "/" + ApplicationConfig.UserFileName;

    const data: IUserState = {
      user: this.user,
      token: this.token
    };

    try {
      await FileService.WriteObjectToFile(userFilePath, data, {
        flags: FileFlags.Writing
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Action
  async LoadUserData() {
    const appPath = app.getPath("userData");
    const settingsFolderPath = appPath + "/" + ApplicationConfig.SettingsPath;
    const settingsFolderExists = await FileService.ExistsFolder(
      settingsFolderPath
    );

    if (!settingsFolderExists) {
      return;
    }

    const userFilePath =
      settingsFolderPath + "/" + ApplicationConfig.UserFileName;

    try {
      const settings = await FileService.ReadFileAs<IUserState>(userFilePath);
      if (settings.user && settings.token) {
        this.SetUser(settings.user);
        this.SetToken(JwtService.DecodeTokenAsJwt(settings.token!.token));
      }
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation
  Reset() {
    this.user = null;
    this.token = null;
  }

  @Action
  Clear() {
    this.Reset();
  }

  @Action
  async Init() {
    await this.LoadUserData();
  }
}

const UserModule = getModule(UserState);

export { UserModule, IUserState };
