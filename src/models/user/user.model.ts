import { UserViewObject, UserLogin, UserPermission, UserSettingsViewObject, UserRealm } from '@/types/apiServerContract';
import { Role } from '../security/Role';

class User implements UserViewObject {
	constructor(
		public id: string,
		public userName: string,
		public accountId: number,
		public currentLogin: UserLogin,
		public email: string,
		public emailHidden: boolean,
		public firstname: string,
		public joinDate: Date,
		public lastLogin: UserLogin,
		public lastname: string,
		public location: string,
		public lockoutEnd: Date,
		public lockoutEnabled: boolean,
		public permissions: UserPermission[],
		public realms: UserRealm[],
		public roles: Role[],
		public settings: UserSettingsViewObject[],
		public totalVotes: number,
		public hasAcceptedDonationTerms: boolean
	) { }

	get IsAdmin(): boolean {
		return this.IsSuperAdmin || this.roles.includes(Role.Administrator);
	}

	get IsSuperAdmin(): boolean {
		return this.roles.includes(Role.SuperAdmin);
	}

	public HasRole(roles: Role[]): boolean {
		return this.IsSuperAdmin || this.roles.some(x => roles.indexOf(x) >= 0);
	}
}

export { User };
