import { PermissionCategory } from './PermissionCategory';

export interface Permission {
	id: string;
	name: string;
	description: string;
	categoryId: number;
	category: PermissionCategory;
}
