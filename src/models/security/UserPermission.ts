import { Permission } from './Permission';

export class UserPermission {
    constructor(
		public userId: string,
		public realmId: number,
		public permissionId: string,
		public permission: Permission,
		public withGrant: boolean
    ) {}
}
