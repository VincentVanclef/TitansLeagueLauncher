import HttpService from '@/services/http/http.service';
import {
	NewsViewModel,
	NewsCommentViewModel,
	NewsViewObject,
	NewsCommentViewObject,
	NewsAddCommentRequest,
	NewsDeleteCommentRequest,
	NewsEditCommentRequest,
	NewsDeleteRequest,
	NewsCreateRequest,
	NewsEditRequest,
	NewsReactionRequest,
	NewsReactionViewObject,
	NewsReactionViewModel,
	NewsCommentReactionRequest,
	NewsCommentAndReactionViewModel,
	NewsCommentReactionViewObject,
	NewsCommentReactionViewModel,
	SpecificNewsRequest,
	NewsCommentAndReactionViewObject
} from '@/types/apiServerContract';

const API_PATH = 'news/';

export class NewsApi {
	public static async GetNews(): Promise<NewsViewObject[]> {
		const result = await HttpService.Get<NewsViewModel>(API_PATH + 'GetNews');
		return result.articles;
	}

	public static async CreateNews(request: NewsCreateRequest): Promise<NewsViewObject> {
		const result = await HttpService.Post<NewsViewModel>(API_PATH + 'CreateNews', request);
		return result.article;
	}

	public static async EditNews(request: NewsEditRequest): Promise<NewsViewObject> {
		const result = await HttpService.Post<NewsViewModel>(API_PATH + 'EditNews', request);
		return result.article;
	}

	public static async DeleteNews(request: NewsDeleteRequest): Promise<void> {
		await HttpService.Post(API_PATH + 'DeleteNews', request);
	}

	public static async AddComment(request: NewsAddCommentRequest): Promise<NewsCommentViewObject[]> {
		const result = await HttpService.Post<NewsCommentViewModel>(API_PATH + 'AddComment', request);
		return result.comments;
	}

	public static async DeleteComment(request: NewsDeleteCommentRequest): Promise<NewsCommentViewObject[]> {
		const result = await HttpService.Post<NewsCommentViewModel>(API_PATH + 'DeleteComment', request);
		return result.comments;
	}

	public static async EditComment(request: NewsEditCommentRequest): Promise<NewsCommentViewObject[]> {
		const result = await HttpService.Post<NewsCommentViewModel>(API_PATH + 'EditComment', request);
		return result.comments;
	}

	public static async NewsReaction(request: NewsReactionRequest): Promise<NewsReactionViewObject> {
		const result = await HttpService.Post<NewsReactionViewModel>(API_PATH + 'NewsReaction', request);
		return result.reaction;
	}

	public static async NewsCommentReaction(request: NewsCommentReactionRequest): Promise<NewsCommentReactionViewObject> {
		const result = await HttpService.Post<NewsCommentReactionViewModel>(API_PATH + 'NewsCommentReaction', request);
		return result.reaction;
	}

	public static async GetNewsData(request: SpecificNewsRequest): Promise<NewsCommentAndReactionViewObject> {
		const result = await HttpService.Post<NewsCommentAndReactionViewModel>(API_PATH + 'GetNewsData', request);
		return result.data;
	}

	public static async GetComments(request: SpecificNewsRequest): Promise<NewsCommentViewObject[]> {
		const result = await HttpService.Post<NewsCommentViewModel>(API_PATH + 'GetComments', request);
		return result.comments;
	}
}
