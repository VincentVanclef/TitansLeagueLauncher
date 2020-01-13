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

interface AccountMuted {
  accountId: number;
  muteDate: number;
  muteTime: number;
  mutedBy: string;
  muteReason: string;
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
  accountMuted: AccountMuted[];
}

interface IApplicationUser {
  accountId: number;
  account: IAccount;
  email: string;
  firstname: string;
  id: string;
  joinDate: Date;
  lastname: string;
  location: string;
  roles: WebsiteRoles[];
  totalVotes: number;
  username: string;
  vp: number;
  dp: number;
}

class ApplicationUser implements IApplicationUser {
  accountId: number;
  account: IAccount;
  email: string;
  firstname: string;
  id: string;
  joinDate: Date;
  lastname: string;
  location: string;
  roles: WebsiteRoles[];
  totalVotes: number;
  username: string;
  vp: number;
  dp: number;

  constructor(
    accountId: number,
    account: IAccount,
    email: string,
    firstname: string,
    id: string,
    joinDate: Date,
    lastname: string,
    location: string,
    roles: WebsiteRoles[],
    totalVotes: number,
    username: string,
    vp: number,
    dp: number
  ) {
    this.id = id;
    this.account = account;
    this.accountId = accountId;
    this.email = email;
    this.firstname = firstname;
    this.joinDate = joinDate;
    this.lastname = lastname;
    this.location = location;
    this.roles = roles;
    this.totalVotes = totalVotes;
    this.username = username;
    this.vp = vp;
    this.dp = dp;
  }
}

export { ApplicationUser, IApplicationUser, IAccount };
