import bus from "@/core/bus";
import axios, { AxiosResponse } from "axios";
import { BusConstants } from "@/core/constants";

import HttpStatus from "http-status-codes";
import { UserModule } from "@/store/modules/user/user.store";

export default async (response: AxiosResponse) => {
  const responseStatus = response.status;
  if (responseStatus === HttpStatus.OK) return response;

  const isTokenExpired = response.headers["token-expired"];
  if (responseStatus === HttpStatus.UNAUTHORIZED && isTokenExpired) {
    const result = await UserModule.RefreshToken();
    if (result) {
      // Token refreshed succesfully, make request again
      const retryResponse = await axios.request(response.config);
      return retryResponse;
    }
  }

  const httpStatusText = response.data.title || response.statusText || "Error";
  const data = response.data;

  let message = data.message || data.title;

  if (data.errors) {
    message = "";
    for (const error in data.errors) {
      message = message + data.errors[error][0] + " ";
    }
  }

  const validationErrorData: IValidationErrorData = {
    httpStatus: responseStatus,
    httpStatusText,
    message: message
  };

  bus.emit(BusConstants.ValidationError, validationErrorData);
  return response;
};

export interface IValidationErrorData {
  httpStatus: number;
  httpStatusText: string;
  message: string;
}
