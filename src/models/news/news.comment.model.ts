export interface INewsComment {
	id: number;
	newsId: number;
	author: string;
	authorName: string;
	comment: string;
	date: Date;
	lastEdited: Date;
}
