import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserModule } from '@/store/modules/user/user.store';
import { CustomHeaders } from '@/core/constants';
import HttpStatus from 'http-status-codes';

const responseHandler = async(response: AxiosResponse) => {
    const responseStatus = response.status;

    const tokenExpired = response?.headers[CustomHeaders.TokenExpired] as boolean;
    if (tokenExpired) {
        UserModule.Reset();
        location.reload(true);
    }

    const token = response?.headers[CustomHeaders.Token] as string;
    if (token) {
        await UserModule.RefreshToken(token);
    }

    if (responseStatus === HttpStatus.UNAUTHORIZED && token) {
        try {
            // Token refreshed succesfully, make request again
            const retryResponse = await axios.request(response.config);
            return retryResponse;
        } catch (e) {
            UserModule.Reset();
            location.reload(true);
        }
    }

    return response;
};

const requestHandler = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (UserModule.token) {
        config.headers.Authorization = `Bearer ${UserModule.token.token}`;
    }

    return config;
};

export {
    requestHandler,
    responseHandler
};
