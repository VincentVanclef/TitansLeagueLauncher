import { AxiosRequestConfig } from "axios";
import { UserModule } from "@/store/modules/user/user.store";

export default (config: AxiosRequestConfig) => {
  config.headers["Authorization"] = UserModule.token
    ? `Bearer ${UserModule.token.token}`
    : "";

  return config;
};
