import { UserModule } from "@/store/modules/user/user.store";
export default (config) => {
    config.headers["Authorization"] = UserModule.token
        ? `Bearer ${UserModule.token.token}`
        : "";
    return config;
};
//# sourceMappingURL=authorization.interceptor.js.map