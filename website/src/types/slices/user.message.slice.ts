import { MessageType } from "../constants/message";
import { UserTypeGet } from "../constants/user";

export interface UserMessState {
    userQuery: UserTypeGet,
    userReceived: UserTypeGet,
    messages: MessageType[],
}
