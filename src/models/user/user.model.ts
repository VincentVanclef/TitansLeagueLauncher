import { WebsiteRoles } from "@/core/Constants";

interface IAccountAccess {
  accountId: number;
  gmlevel: number;
  realmId: number;
}

interface IAccountBanned {
  accountId: number;
  banDate: number;
  unbanDate: number;
  bannedBy: string;
  banReason: string;
  active: number;
}

interface IAccountMuted {
  accountId: number;
  muteDate: number;
  muteTime: number;
  mutedBy: string;
  muteReason: string;
}

interface IAccountData {
  id: number;
  vp: number;
  dp: number;
  extraMask: number;
}

interface IAccount {
  id: number;
  email: string;
  failedLogins: number;
  joinDate: string;
  lastAttemptIp: string;
  lastIp: string;
  lastLogin: string;
  locked: number;
  muteBy: string;
  muteReason: string;
  muteTime: number;
  online: number;
  os: string;
  recruiter: number;
  username: string;
  accountAccess: IAccountAccess[];
  accountBanned: IAccountBanned[];
  accountMuted: IAccountMuted[];
}

interface IApplicationUser {
  id: string;
  accountId: number;
  email: string;
  userName: string;
  firstname: string;
  joinDate: Date;
  lastname: string;
  location: string;
  roles: WebsiteRoles[];
  claims: string[];
  totalVotes: number;
}

class ApplicationUser implements IApplicationUser {
  constructor(
    public id: string,
    public accountId: number,
    public email: string,
    public firstname: string,
    public joinDate: Date,
    public lastname: string,
    public location: string,
    public roles: WebsiteRoles[],
    public claims: string[],
    public totalVotes: number,
    public userName: string,
  ) {}
}

export {
  ApplicationUser,
  IApplicationUser,
  IAccount,
  IAccountAccess,
  IAccountBanned,
  IAccountMuted,
  IAccountData
};
