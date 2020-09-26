import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { Jwt } from '@/models/jwt/jwt.model';
import { ApplicationUser, IAccount, IAccountData } from '@/models/user/user.model';
import { UserApi } from '@/services/api/api.user';
import { IUserLoginRequest } from '@/models/user/requests/UserLoginRequest';
import { IUserLoginResponse } from '@/models/user/responses/UserLoginResponse';
import { IUserRegisterRequest } from '@/models/user/requests/UserRegisterRequest';

import JwtService from '@/services/jwt/jwt.service';

import FileService, { FileFlags, FileEncodings } from '@/services/fileService/file.service';

import Bus from '@/core/bus';
import { BusConstants, ApplicationConfig } from '@/core/constants';
import {
	AccountViewObject,
	GameAccountData,
	UserLoginRequest,
	UserLoginViewModel,
	UserRegisterRequest,
	UserViewObject
} from '@/types/apiServerContract';

const app = require('electron').remote.app;

interface IUserState {
	user?: UserViewObject | null;
	account?: AccountViewObject | null;
	accountData?: GameAccountData | null;
	token?: Jwt | null;
}

@Module({ namespaced: true, dynamic: true, store, name: 'UserModule' })
class UserState extends VuexModule implements IUserState {
	account: AccountViewObject | null = null;
	accountData: GameAccountData | null = null;
	user: UserViewObject | null = null;
	token: Jwt | null = null;

	get IsLoggedIn(): boolean {
		return this.user != null && this.token != null && !this.token.IsTokenExpired();
	}

	@Mutation
	HandleLoginResponse(result: UserLoginViewModel) {
		this.user = result.user;
		this.account = result.account;
		this.accountData = result.accountData;
		this.token = JwtService.DecodeTokenAsJwt(result.token);
	}

	@Mutation
	SetUser(user: UserViewObject | null = null) {
		this.user = user;
	}

	@Mutation
	SetAccount(account: AccountViewObject | null = null) {
		this.account = account;
	}

	@Mutation
	SetAccountData(accountData: GameAccountData | null = null) {
		this.accountData = accountData;
	}

	@Mutation
	SetToken(token: Jwt | null = null) {
		this.token = token;
	}

	@Mutation
	UpdateToken(token: string) {
		const decodedToken = JwtService.DecodeTokenAsJwt(token);
		this.token = decodedToken;
	}

	@Action
	async Login(request: UserLoginRequest): Promise<UserLoginViewModel> {
		const result = await UserApi.Login(request);
		this.HandleLoginResponse(result);
		await this.SaveUserData();
		Bus.emit(BusConstants.OnLogin, result);
		return result;
	}

	@Action
	async Register(request: UserRegisterRequest): Promise<UserLoginViewModel> {
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
		if (!this.token) {
			return false;
		}

		const refreshTokenResponse = await UserApi.RefreshToken(this.token.token);
		if (!refreshTokenResponse.token) {
			this.Logout();
			return false;
		}

		this.SetUser(refreshTokenResponse.user);
		this.UpdateToken(refreshTokenResponse.token);
		return true;
	}

	@Action
	async SaveUserData() {
		const appPath = app.getPath('userData');
		const settingsFolderPath = appPath + '/' + ApplicationConfig.SettingsPath;
		const settingsFolderExists = await FileService.ExistsFolder(settingsFolderPath);
		if (!settingsFolderExists) {
			await FileService.CreateFolder(settingsFolderPath);
		}

		const userFilePath = settingsFolderPath + '/' + ApplicationConfig.UserFileName;

		const data: IUserState = {
			account: this.account,
			accountData: this.accountData,
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
		const appPath = app.getPath('userData');
		const settingsFolderPath = appPath + '/' + ApplicationConfig.SettingsPath;
		const settingsFolderExists = await FileService.ExistsFolder(settingsFolderPath);

		if (!settingsFolderExists) {
			return;
		}

		const userFilePath = settingsFolderPath + '/' + ApplicationConfig.UserFileName;

		try {
			const settings = await FileService.ReadFileAs<IUserState>(userFilePath);
			if (settings.user && settings.token) {
				this.SetUser(settings.user);
				this.SetAccount(settings.account);
				this.SetAccountData(settings.accountData);
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
		this.account = null;
		this.accountData = null;
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
