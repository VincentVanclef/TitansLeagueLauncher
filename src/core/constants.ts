export const BusConstants = {
  OnLogin: "OnLogin",
  OnLogout: "OnLogout",
  ValidationError: "ValidationError"
};

export enum WebsiteRoles {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
  Moderator = "Moderator",
  Developer = "Developer"
}

export enum GameRoles {
  Admin = 3,
  GameMaster = 2,
  Trial = 1,
  Player = 0
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

export interface IConfiguration {
  wowPath: string;
  autoClearCache: boolean;
  autoCheckForUpdates: boolean;
}

export const Baseconfig: IConfiguration = {
  wowPath: "",
  autoCheckForUpdates: false,
  autoClearCache: false
};

export const ApplicationConfig = {
  SettingsPath: "Settings",
  SettingsFileName: "settings.json"
};

export const RealmlistConfig = {
  Realmlist: "logon.Titans-League.org",
  RealmlistFileName: "realmlist.wtf",
  RealmlistFileLocation: "data"
};
