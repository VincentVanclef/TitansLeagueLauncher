import { VuexModule, Module, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { Jwt } from '@/models/jwt/jwt.model';
import { UserApi } from '@/services/api/api.user';
import { User } from '@/models/user/user.model';

import JwtService from '@/services/jwt/jwt.service';

import FileService, { FileFlags } from '@/services/fileService/file.service';

import Bus from '@/core/bus';
import { BusConstants, ApplicationConfig } from '@/core/constants';
import {
    AccountViewObject,
    GameAccountData,
    UserLoginRequest,
    UserLoginViewModel,
    UserRegisterRequest,
    UserViewObject,
    VoteSiteViewObject,
    VoteTimerViewObject
} from '@/types/apiServerContract';
import { Role } from '@/models/security/Role';

const app = require('electron').remote.app;

interface IUserState {
	user?: UserViewObject | null;
	account?: AccountViewObject | null;
	token?: Jwt | null;
}

@Module({ namespaced: true, dynamic: true, store, name: 'UserModule' })
class UserState extends VuexModule {
	account: AccountViewObject | null = null;
	user: User | null = null;
	token: Jwt | null = null;

	get IsLoggedIn(): boolean {
	    return this.user != null && this.token != null;
	}

	@Mutation
	SaveUser(user: UserViewObject | null = null) {
	    this.user = user
	        ? new User(
	            user.id,
	            user.userName,
	            user.accountId,
	            user.currentLogin,
	            user.email,
	            user.emailHidden,
	            user.firstname,
	            new Date(user.joinDate),
	            user.lastLogin,
	            user.lastname,
	            user.location,
	            user.lockoutEnd ? new Date(user.lockoutEnd) : null as any,
	            user.lockoutEnabled,
	            user.permissions,
	            user.realms,
				user.roles as Role[],
				user.settings,
				user.totalVotes,
				user.hasAcceptedDonationTerms
	        )
	        : null;
	}

	@Mutation
	SaveAccount(account: AccountViewObject | null = null) {
	    this.account = account;
	}

	@Mutation
	SaveAccountData(accountData: GameAccountData) {
	    if (!this.account) return;

	    this.account.accountData = accountData;
	}

	@Mutation
	SaveToken(token: Jwt | null = null) {
	    this.token = Object.freeze(token);
	}

	@Mutation
	UpdateToken(token: string) {
	    const decodedToken = JwtService.DecodeTokenAsJwt(token);
	    this.token = decodedToken;
	}

	@Action({ rawError: true })
	async GetUserData() {
	    const result = await UserApi.GetUserData();
	    this.SaveUser(result.user);
	    this.SaveAccount(result.account);
	}

	@Action
	async Login(request: UserLoginRequest): Promise<UserLoginViewModel> {
	    const result = await UserApi.Login(request);
	    this.SaveUser(result.user);
	    this.SaveAccount(result.account);
	    this.SaveToken(JwtService.DecodeTokenAsJwt(result.token));
	    await this.SaveUserData();
	    Bus.emit(BusConstants.OnLogin, result);
	    return result;
	}

	@Action
	async Register(request: UserRegisterRequest): Promise<UserLoginViewModel> {
	    const result = await UserApi.Register(request);
	    this.SaveUser(result.user);
	    this.SaveAccount(result.account);
	    this.SaveToken(JwtService.DecodeTokenAsJwt(result.token));
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

	@Action({ rawError: true })
	async RefreshToken(token: string): Promise<boolean> {
	    this.SaveToken(JwtService.DecodeTokenAsJwt(token));
	    Bus.emit(BusConstants.OnLogin); // Trigger an on-login hook as we got a new token so basically a new login state
	    return true;
	}

	@Action({ rawError: true })
	async Vote(site: VoteSiteViewObject) {
	    await UserApi.Vote(site);
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
	            this.SaveUser(settings.user);
	            this.SaveToken(settings.token);

	            await this.GetUserData();
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
