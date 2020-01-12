import { INewsComment } from "./news.comment.model";

export interface INews {
  id: number;
  title: string;
  content: string;
  image: string;
  date: Date;
  comments: INewsComment[];
}
