import bus from '@/core/bus';
import { BusConstants } from '@/core/constants';
import { ClientMessage, ClientMessageType } from '@/core/messages/messages.store';
import { ValidationErrorEvent } from '@/core/messages/types';
import { AxiosResponse } from 'axios';

import HttpStatus from 'http-status-codes';
import { AxiosRequestConfigExtended } from '../http.service';

export default async (response: AxiosResponse) => {
    const messages = response.data?.validationMessages as ClientMessage[];
    if (messages) {
        // Validation-messages received. If a messagesId is included (from a post) forward messages to local handler
        // If no messagesId or no one wanted to handle, show globally.
        const messagesId: string | undefined = (response.config as AxiosRequestConfigExtended)?.messageId;
        let isHandled = false;
        if (messagesId) {
            bus.emit(BusConstants.ValidationErrorEventKey, {
                messagesId,
                messages,
                handled: () => (isHandled = true)
            } as ValidationErrorEvent);
        }

        if (!isHandled) {
            bus.emit(BusConstants.GeneralErrorEventKey, messages);
        }
    } else if (isErrorStatusCode(response.status)) {
        // Got raw error without messages in the "normal" validationMessages prop - handle that as well. Translate if label.
        const rawTxt = response.data;
        const message = rawTxt;
        bus.emit(BusConstants.GeneralErrorEventKey, [{
            message,
            messageType: ClientMessageType.Error
        }]);
    }
    return response;

    function isErrorStatusCode(statusCode: number): boolean {
        return [HttpStatus.BAD_REQUEST, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.BAD_GATEWAY].includes(statusCode);
    }
};

export interface IValidationErrorData {
    httpStatus: number;
    httpStatusText: string;
    message: string;
}
