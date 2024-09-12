export interface MessageType {
    id?: number | null,
    userSendId?: number,
    userReceiveId?: number,
    message?: string,
    timeSend?: string,
    image?: string,
    file?: string
}