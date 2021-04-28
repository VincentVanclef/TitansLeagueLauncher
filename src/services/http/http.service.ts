import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import HttpStatus from 'http-status-codes';
import { requestHandler as oAuthRequestInterceptor, responseHandler as oAuthResponseInterceptor } from './interceptors/authorization.interceptor';
import validationErrrorsInterceptor from './interceptors/validationErrors.interceptor';
import { HttpCancelError } from '../api/HttpCancelError';

export interface AxiosRequestConfigExtended extends AxiosRequestConfig {
	messageId?: string;
}

const API_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : 'https://titans-league.org/api';

export class HttpService {
	private responseInterceptors: Array<(value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>> = [
	    validationErrrorsInterceptor, oAuthResponseInterceptor
	];

	private requestInterceptors: Array<(value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>> = [oAuthRequestInterceptor];

	private get defaultGetHeaders(): any {
	    return {
	        'Content-Type': 'application/json' // must use this casing for the authentication service to work
	    };
	}

	constructor() {
	    this.registerInterceptors();

	    // Those status'es that should cause "then" to be executed (so we can have interceptors)
	    const handledErrorStatusCodes = [HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.UNAUTHORIZED];
	    axios.defaults.validateStatus = status => (status >= 200 && status < 300) || handledErrorStatusCodes.includes(status);
	}

	private registerInterceptors() {
	    this.responseInterceptors.forEach(i => axios.interceptors.response.use(i));
	    this.requestInterceptors.forEach(i => axios.interceptors.request.use(i));
	}

	private getUrl(relativeUrl: string): string {
	    relativeUrl = removeLeadingSlash(relativeUrl);
	    return `${API_URL}/${relativeUrl}`;

	    function removeLeadingSlash(url: string) {
	        return url.charAt(0) === '/' ? url.substr(1) : url;
	    }
	}

	private handlePotentialErrorResponse<T>(res: AxiosResponse<T>): T {
	    if (res.status === HttpStatus.BAD_REQUEST || res.status === HttpStatus.INTERNAL_SERVER_ERROR) {
	        // Validatestatus above is set to include these ones so it will trigger 'then'.
	        // Reason is that interceptors will then be run automatically on this as well.
	        throw res;
	    } else if (res.status === HttpStatus.UNAUTHORIZED) {
	        console.log('Not logged in, status:', res.status, res.data);
	    }
	    return res.data;
	}

	private handleErrorResponse(error: any): void {
	    if (error) {
	        if (error instanceof HttpCancelError) {
	            return;
	        }
	    }
	    throw error;
	}

	private unwrapResponse(data: any) {
	    return data.model;
	}

	private requestDictionary: { [key: string]: CancelTokenSource | null } = {};

	private requestSucceded(res: AxiosResponse) {
	    if (res.config.url) {
	        this.requestDictionary[res.config.url] = null;
	        delete this.requestDictionary[res.config.url];
	    }
	    return res;
	}

	private ensureCancellationToken(url: string) {
	    let cancelTokenSrc = this.requestDictionary[url];
	    if (cancelTokenSrc) {
	        cancelTokenSrc.cancel();
	    }

	    cancelTokenSrc = axios.CancelToken.source();
	    this.requestDictionary[url] = cancelTokenSrc;

	    return cancelTokenSrc;
	}

	public async Get<T>(url: string, params?: any, config?: AxiosRequestConfig, allowMultipleRequests?: boolean): Promise<T> {
	    config = config || {};

	    config = {
	        ...config,
	        ...{
	            headers: this.defaultGetHeaders,
	            data: {}, // Axios kills application/json if no data object is provided https://github.com/axios/axios/issues/86#issuecomment-139638284
	            params
	        }
	    };
	    const absoluteUrl = this.getUrl(url);
	    const cancelTokenSrc = allowMultipleRequests ? undefined : this.ensureCancellationToken(url);

	    return axios
	        .get(absoluteUrl, { ...config, cancelToken: cancelTokenSrc!.token })
	        .then(res => this.requestSucceded(res))
	        .then(res => this.handlePotentialErrorResponse(res))
	        .then(res => this.unwrapResponse(res))
	        .catch(e => this.handleErrorResponse(e));
	}

	public async Post<T>(url: string, payload: any, config?: AxiosRequestConfig, allowMultipleRequests?: boolean): Promise<T> {
	    config = config || {};

	    config = {
	        ...config,
	        headers: this.defaultGetHeaders
	    };
	    const absoluteUrl = this.getUrl(url);
	    const cancelTokenSrc = allowMultipleRequests ? undefined : this.ensureCancellationToken(url);

	    return axios
	        .post(absoluteUrl, payload, { ...config, cancelToken: cancelTokenSrc?.token })
	        .then(res => this.requestSucceded(res))
	        .then(res => this.handlePotentialErrorResponse(res))
	        .then(res => this.unwrapResponse(res))
	        .catch(e => this.handleErrorResponse(e));
	}

	public Delete<T>(url: string, params?: any): Promise<T> {
	    return axios
	        .delete(this.getUrl(url), params)
	        .then(res => this.requestSucceded(res))
	        .then(res => this.handlePotentialErrorResponse(res))
	        .then(res => this.unwrapResponse(res))
	        .catch(e => this.handleErrorResponse(e));
	}

	public Put<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
	    return axios
	        .put(this.getUrl(url), params, config)
	        .then(res => this.requestSucceded(res))
	        .then(res => this.handlePotentialErrorResponse(res))
	        .then(res => this.unwrapResponse(res))
	        .catch(e => this.handleErrorResponse(e));
	}
}

export default new HttpService();
