import axios from "axios";
import HttpStatus from "http-status-codes";
import authorizationIntercptor from "./interceptors/authorization.interceptor";
import validationErrrorsInterceptor from "./interceptors/validationErrors.interceptor";
import bus from "@/core/bus";
import { BusConstants } from "@/core/Constants";
const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://localhost:5001/api";
export class HttpService {
    constructor() {
        this.responseInterceptors = [validationErrrorsInterceptor];
        this.requestInterceptors = [authorizationIntercptor];
        this.pageCancelTokenSrc = null;
        this.registerInterceptors();
        // Those status'es that should cause "then" to be executed (so we can have interceptors)
        const handledErrorStatusCodes = [
            HttpStatus.BAD_REQUEST,
            HttpStatus.NOT_FOUND,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpStatus.UNAUTHORIZED
        ];
        axios.defaults.validateStatus = status => (status >= 200 && status < 300) ||
            handledErrorStatusCodes.includes(status);
    }
    get defaultGetHeaders() {
        return {
            "Content-Type": "application/json" // must use this casing for the authentication service to work
        };
    }
    registerInterceptors() {
        this.responseInterceptors.forEach(i => axios.interceptors.response.use(i));
        this.requestInterceptors.forEach(i => axios.interceptors.request.use(i));
    }
    getUrl(relativeUrl) {
        relativeUrl = removeLeadingSlash(relativeUrl);
        return `${API_URL}/${relativeUrl}`;
        function removeLeadingSlash(url) {
            return url.charAt(0) === "/" ? url.substr(1) : url;
        }
    }
    handlePotentialErrorResponse(res) {
        if (res.status === HttpStatus.BAD_REQUEST ||
            res.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            // Validatestatus above is set to include these ones so it will trigger 'then'.
            // Reason is that interceptors will then be run automatically on this as well.
            throw res;
        }
        else if (res.status === HttpStatus.UNAUTHORIZED) {
            console.log("Not logged in, status:", res.status, res.data);
        }
        return res.data;
    }
    handleErrorResponse(error) {
        const errors = JSON.parse(JSON.stringify(error));
        const status = error.response.status;
        let validationErrorData = {
            httpStatus: status,
            httpStatusText: error.response.statusText,
            message: errors.message
        };
        // switch (status) {
        //   case HttpStatus.FORBIDDEN:
        //     validationErrorData.message =
        //       "You are not authorized to perform this action";
        //     break;
        // }
        if (error.response && error.response.data && error.response.data.message) {
            validationErrorData.httpStatusText = error.response.data.message;
        }
        bus.emit(BusConstants.ValidationError, validationErrorData);
    }
    async Get(url, params) {
        return axios
            .get(this.getUrl(url), params)
            .then(res => this.handlePotentialErrorResponse(res))
            .catch(err => this.handleErrorResponse(err));
    }
    async Post(relativeUrl, payload) {
        return axios
            .post(this.getUrl(relativeUrl), payload)
            .then(res => this.handlePotentialErrorResponse(res))
            .catch(err => this.handleErrorResponse(err));
    }
    Delete(url, params) {
        return axios
            .delete(this.getUrl(url), params)
            .then(res => this.handlePotentialErrorResponse(res))
            .catch(err => this.handleErrorResponse(err));
    }
    Put(url, params) {
        return axios
            .put(this.getUrl(url), params)
            .then(res => this.handlePotentialErrorResponse(res))
            .catch(err => this.handleErrorResponse(err));
    }
}
export default new HttpService();
//# sourceMappingURL=http.service.js.map