import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource
} from "axios";
import HttpStatus from "http-status-codes";
import authorizationIntercptor from "./interceptors/authorization.interceptor";
import validationErrrorsInterceptor, {
  IValidationErrorData
} from "./interceptors/validationErrors.interceptor";
import { BusConstants } from "@/core/constants";
import bus from "@/core/bus";
import LogService from "@/services/logs/log.service";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "https://localhost:44342"
    : "https://titans-league.org/api";

export class HttpService {
  private responseInterceptors: Array<
    (
      value: AxiosResponse<any>
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>
  > = [validationErrrorsInterceptor];

  private requestInterceptors: Array<
    (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  > = [authorizationIntercptor];

  private pageCancelTokenSrc: CancelTokenSource | null = null;

  private get defaultGetHeaders(): any {
    return {
      "Content-Type": "application/json" // must use this casing for the authentication service to work
    };
  }

  constructor() {
    this.registerInterceptors();

    // Those status'es that should cause "then" to be executed (so we can have interceptors)
    const handledErrorStatusCodes = [
      HttpStatus.BAD_REQUEST,
      HttpStatus.NOT_FOUND,
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpStatus.UNAUTHORIZED
    ];
    axios.defaults.validateStatus = status =>
      (status >= 200 && status < 300) ||
      handledErrorStatusCodes.includes(status);
  }

  private registerInterceptors() {
    this.responseInterceptors.forEach(i => axios.interceptors.response.use(i));
    this.requestInterceptors.forEach(i => axios.interceptors.request.use(i));
  }

  private getUrl(relativeUrl: string): string {
    relativeUrl = removeLeadingSlash(relativeUrl);
    return `${API_URL}/${relativeUrl}`;

    function removeLeadingSlash(url: string) {
      return url.charAt(0) === "/" ? url.substr(1) : url;
    }
  }

  private handlePotentialErrorResponse<T>(res: AxiosResponse<T>): T {
    if (
      res.status === HttpStatus.BAD_REQUEST ||
      res.status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      // Validatestatus above is set to include these ones so it will trigger 'then'.
      // Reason is that interceptors will then be run automatically on this as well.
      throw res;
    } else if (res.status === HttpStatus.UNAUTHORIZED) {
      console.log("Not logged in, status:", res.status, res.data);
    }
    return res.data;
  }

  private handleErrorResponse(error: any): void {
    const errors = JSON.parse(JSON.stringify(error));
    const status =
      errors && errors.response ? errors.response.status : errors.status;

    const validationErrorData: IValidationErrorData = {
      httpStatus: status,
      httpStatusText:
        errors && errors.response
          ? errors.response.statusText
          : errors.statusText,
      message: errors.message
    };

    // switch (status) {
    //   case HttpStatus.FORBIDDEN:
    //     validationErrorData.message =
    //       "You are not authorized to perform this action";
    //     break;
    // }

    if (errors && errors.data && errors.data.message) {
      validationErrorData.message = error.data.message;
    }

    if (
      errors.response &&
      errors.response.data &&
      errors.response.data.message
    ) {
      validationErrorData.message = errors.response.data.message;
    }

    if (validationErrorData.httpStatusText.length === 0) {
      validationErrorData.httpStatusText = "Error";
    }

    if (!validationErrorData.message) return;

    LogService.Log("handleErrorResponse", JSON.stringify(error));
    bus.emit(BusConstants.ValidationError, validationErrorData);
  }

  public async Get<T>(url: string, params?: any): Promise<T> {
    return axios
      .get(this.getUrl(url), params)
      .then(res => this.handlePotentialErrorResponse(res));
  }

  public async Post<T>(relativeUrl: string, payload?: any): Promise<T> {
    return axios
      .post(this.getUrl(relativeUrl), payload)
      .then(res => this.handlePotentialErrorResponse(res));
  }

  public Delete<T>(url: string, params?: any): Promise<T> {
    return axios
      .delete(this.getUrl(url), params)
      .then(res => this.handlePotentialErrorResponse(res));
  }

  public Put<T>(url: string, params?: any): Promise<T> {
    return axios
      .put(this.getUrl(url), params)
      .then(res => this.handlePotentialErrorResponse(res));
  }
}

export default new HttpService();
