import Vue from 'vue';
// import makeStoreDebugAccessible from '@/core/store/storeDebug';

export enum ClientMessageType {
    Error = 0,
    Warning = 1,
    Info = 2
}
export interface ClientMessage {
    message: string,
    messageType: ClientMessageType
}

export interface ClientMessageEx extends ClientMessage {
    id: string;
}

interface IMessagesState {
    apiMessages: ClientMessageEx[];
}

class MessagesStore {
    private state: IMessagesState = Vue.observable({
        apiMessages: []
    });

    public constructor() {
        // makeStoreDebugAccessible('messagesStore', this.state);
    }

    public get apiMessages(): ClientMessageEx[] {
        return this.state.apiMessages;
    }

    public addApiMessages(newMessages: ClientMessage[]): void {
        const uniqueNewMsgs = newMessages.filter(
            m => !this.state.apiMessages.find(am => am.message === m.message && am.messageType === m.messageType)
        );
        this.state.apiMessages = this.state.apiMessages.concat(
            uniqueNewMsgs.map((m, ix) => {
                return {
                    ...m,
                    id: new Date().valueOf() + ix.toString()
                };
            })
        );
    }

    public clearApiMessage(id: string): void {
        this.state.apiMessages = this.state.apiMessages.filter(m => m.id !== id);
    }
}

export default new MessagesStore();
