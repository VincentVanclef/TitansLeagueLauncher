import { PatchViewObject } from '@/types/apiServerContract';

export enum BusConstants {
	OnLogin = 'OnLogin',
	OnLogout = 'OnLogout',
	UpdateAvailable = 'UpdateAvailable',
	LoginRequired = 'LoginRequired',
	Register = 'Register',
	RealmRequired = 'RealmRequired',
	SelectedRealmChanged = 'SelectedRealmChanged',
	ShowProfileMenu = 'ShowProfileMenu',
	SelectedUserChanged = 'SelectedUserChanged',
	ReloadWebsite = 'ReloadWebsite',
	UpdateUserSessions = 'UpdateUserSessions',
	NotificationReceived = 'NotificationReceived',
	GroupChatDisbanded = 'GroupChatDisbanded',
	GeneralErrorEventKey = 'GeneralErrorEventKey',
	ValidationErrorEventKey = 'ValidationErrorEventKey',
	VoteSuccess = 'VoteSuccess'
}

export enum WebsiteRoles {
	SuperAdmin = 'Super Admin',
	Admin = 'Admin',
	Moderator = 'Moderator',
	Developer = 'Developer'
}

export enum GameRoles {
	Admin = 3,
	GameMaster = 2,
	Trial = 1,
	Player = 0
}

export enum CustomHeaders {
	Token = 'x-titan-token',
	TokenExpired = 'x-token-expired'
}

export const MapGameRole = (role: GameRoles): string => {
	switch (role) {
		case GameRoles.Admin:
			return GameRoles[GameRoles.Admin];
		case GameRoles.GameMaster:
			return GameRoles[GameRoles.GameMaster];
		case GameRoles.Trial:
			return GameRoles[GameRoles.Trial];
		case GameRoles.Player:
			return GameRoles[GameRoles.Player];
		default:
			throw new Error(`Unsupported game role type: ${role}`);
	}
};

export interface IPatchConfig {
	patch: string;
	modified: Date;
	keepUpdated: boolean;
	details: string;
	downloadLink: string;
}

export interface IConfiguration {
	wowPath: string;
	realmlistPath: string;
	autoClearCache: boolean;
	autoCheckForUpdates: boolean;
	autoResetRealmlist: boolean;
	enableLogs: boolean;
	patchConfig: PatchViewObject[];
}

export const Baseconfig: IConfiguration = {
	wowPath: '',
	realmlistPath: '',
	autoCheckForUpdates: true,
	autoClearCache: true,
	autoResetRealmlist: true,
	enableLogs: false,
	patchConfig: []
};

export const ApplicationConfig = {
	SettingsPath: 'Settings',
	SettingsFileName: 'settings.json',
	UserFileName: 'user.json',
	WebsiteURL: 'https://titans-league.org',
	PatchPath: 'Data',
	ServerStatusUpdateInterval: 300000
};

export const RealmlistConfig = {
	Realmlist: 'logon.Titans-League.org',
	RealmlistFileName: 'realmlist.wtf',
	RealmlistFileLocation: 'data'
};

export enum WowLocales {
	frFR = 'frFR', // French (France)
	deDE = 'deDE', // German (Germany)
	enGB = 'enGB', // English (Great Britain) if returned, can substitute 'enUS' for consistancy
	enUS = 'enUS', // English (America)
	itIT = 'itIT', // Italian (Italy)
	koKR = 'koKR', // Korean (Korea) RTL - right-to-left
	zhCN = 'zhCN', // Chinese (China) (simplified) implemented LTR left-to-right in WoW
	zhTW = 'zhTW', // Chinese (Taiwan) (traditional) implemented LTR left-to-right in WoW
	ruRU = 'ruRU', // Russian (Russia)
	esES = 'esES', // Spanish (Spain)
	esMX = 'esMX', // Spanish (Mexico)
	ptBR = 'ptBR' // Portuguese (Brazil)
}

export const WoWLocalesArray = () => {
	return Object.keys(WowLocales);
};
