import { Permission } from '@/models/security/Permission';
import { PermissionCategory } from '@/models/security/PermissionCategory';

export interface IPermissionsResponse {
	permissions: Permission[];
	categories: PermissionCategory[];
}
