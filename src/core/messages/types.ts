export enum ClientMessageType {
    Error = 0,
    Warning = 1,
    Info = 2
}
export interface ClientMessage {
    message: string,
    messageType: ClientMessageType
}

export interface ValidationErrorEvent {
    messagesId: string;
    messages: ClientMessage[];
    handled: () => void;
}
