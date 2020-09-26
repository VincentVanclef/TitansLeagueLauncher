import { UserPermission } from '../security/UserPermission';
import { Role } from '../security/Role';

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
	lastname: string;
	joinDate: Date;
	location: string;
	totalVotes: number;
	roles: Role[];
	permissions: UserPermission[];
}

class ApplicationUser implements IApplicationUser {
	constructor(
		public id: string,
		public accountId: number,
		public email: string,
		public userName: string,
		public firstname: string,
		public lastname: string,
		public joinDate: Date,
		public location: string,
		public totalVotes: number,
		public roles: Role[],
		public permissions: UserPermission[]
	) {}

	get IsSuperAdmin(): boolean {
		return this.roles.includes(Role.SuperAdmin);
	}

	public HasRole(roles: Role[]): boolean {
		return this.IsSuperAdmin || this.roles.some(x => roles.indexOf(x) >= 0);
	}

	public HasPermission(permissions: string[]): boolean {
		return this.IsSuperAdmin || this.permissions.some(x => permissions.includes(x.permissionId));
	}
}

export { ApplicationUser, IApplicationUser, IAccount, IAccountAccess, IAccountBanned, IAccountMuted, IAccountData };
