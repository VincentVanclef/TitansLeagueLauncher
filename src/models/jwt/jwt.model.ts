import { WebsiteRoles } from '@/core/Constants';

interface IJwt {
	token: string;
	uniqueName: string;
	nameId: string;
	email: string;
	expireAt: Date;
	issuedAt: Date;

	IsTokenExpired(): boolean;
	HasRole(roles: WebsiteRoles[]): boolean;
}

class Jwt implements IJwt {
	token: string;
	uniqueName: string;
	nameId: string;
	email: string;
	expireAt: Date;
	issuedAt: Date;
	roles: WebsiteRoles[];

	constructor(token: string, tokenDecoded: any) {
	    this.token = token;
	    this.uniqueName = tokenDecoded.unique_name;
	    this.nameId = tokenDecoded.nameid;
	    this.email = tokenDecoded.email;
	    this.expireAt = new Date(tokenDecoded.exp * 1000);
	    this.issuedAt = new Date(tokenDecoded.iat * 1000);
	    this.roles = Array.isArray(tokenDecoded.role) ? [...tokenDecoded.role] : [tokenDecoded.role];
	}

	public IsTokenExpired(): boolean {
	    return this.expireAt && this.expireAt < new Date();
	}

	public HasRole(roles: WebsiteRoles[]): boolean {
	    return this.roles.some(x => roles.indexOf(x) >= 0);
	}
}

export { Jwt, IJwt };
