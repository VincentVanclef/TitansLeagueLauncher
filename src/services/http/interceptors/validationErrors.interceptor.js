import bus from "@/core/bus";
import axios from "axios";
import { BusConstants } from "@/core/Constants";
import HttpStatus from "http-status-codes";
import { UserModule } from "@/store/modules/user/user.store";
export default async (response) => {
    const responseStatus = response.status;
    if (responseStatus === HttpStatus.OK)
        return response;
    const isTokenExpired = response.headers["token-expired"];
    if (responseStatus === HttpStatus.UNAUTHORIZED && isTokenExpired) {
        const result = await UserModule.RefreshToken();
        if (result) {
            // Token refreshed succesfully, make request again
            const retryResponse = await axios.request(response.config);
            return retryResponse;
        }
    }
    const httpStatusText = response.statusText || "Unknown";
    const data = response.data;
    const validationErrorData = {
        httpStatus: responseStatus,
        httpStatusText,
        message: data.message || data.title
    };
    bus.emit(BusConstants.ValidationError, validationErrorData);
    return response;
};
//# sourceMappingURL=validationErrors.interceptor.js.map