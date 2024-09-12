import { put, takeEvery, takeLatest } from "redux-saga/effects";
import * as sli from "@/stores/slices/messageSlice";
import { MessageType } from "@/types/constants/message";
import { PayloadAction } from "@reduxjs/toolkit";
function* getMessagesSaga() {
    try {
        yield put(sli.getMessagesSucess([
            {
                userQuery: {
                    id: 1,
                    email: "john@gmail.com",
                    nickname: "John Doe",
                    avatar: "",
                },
                userReceived: {
                    id: 2,
                    email: "sara@gmail.com",
                    nickname: "Sara",
                    avatar: "",
                },
                messages: [
                    { id: 1, userSendId: 2, userReceiveId: 1, message: 'Hello 🤩!', timeSend: '9:07 AM', image: "https://i.pinimg.com/736x/04/3e/85/043e8570d742824bb5fa181d622caa7d.jpg" },
                    { id: 2, userSendId: 1, userReceiveId: 2, message: 'Hi 🤩!', timeSend: '9:08 AM' },
                    { id: 3, userSendId: 2, userReceiveId: 1, message: 'How are you?', timeSend: '9:10 AM' },
                    { id: 4, userSendId: 1, userReceiveId: 2, message: 'I am good, thanks!', timeSend: '9:11 AM' },
                    { id: 5, userSendId: 2, userReceiveId: 1, message: 'What are you up to?', timeSend: '9:12 AM' },
                    { id: 6, userSendId: 1, userReceiveId: 2, message: 'Just working on a project.', timeSend: '9:13 AM' },
                    { id: 7, userSendId: 2, userReceiveId: 1, message: 'Nice! Need any help?', timeSend: '9:14 AM' },
                    { id: 8, userSendId: 1, userReceiveId: 2, message: 'Sure, that would be great.', timeSend: '9:15 AM' },
                    { id: 9, userSendId: 2, userReceiveId: 1, message: 'Okay, let me check it out. Okay, let me check it out. Okay, let me check it out. Okay, let me check it out.', timeSend: '9:16 AM' },
                    { id: 10, userSendId: 1, userReceiveId: 2, message: 'Thanks!', timeSend: '9:17 AM' },
                    { id: 1, userSendId: 2, userReceiveId: 1, message: 'Hello 🤩!', timeSend: '9:07 AM', image: "https://i.pinimg.com/736x/04/3e/85/043e8570d742824bb5fa181d622caa7d.jpg" },
                    { id: 2, userSendId: 1, userReceiveId: 2, message: 'Hi 🤩!', timeSend: '9:08 AM' },
                    { id: 3, userSendId: 2, userReceiveId: 1, message: 'How are you?', timeSend: '9:10 AM' },
                    { id: 4, userSendId: 1, userReceiveId: 2, message: 'I am good, thanks!', timeSend: '9:11 AM' },
                ]
            }
        ]));
    } catch (error) {

    }
}

function* sendMessageSaga(actions: PayloadAction<MessageType>) {
    try {
        yield put(sli.sendMessagesSuccess(
            {
                userSendId: actions.payload.userSendId,
                userReceiveId: actions.payload.userReceiveId,
                message: actions.payload.message,
                timeSend: actions.payload.timeSend
            }
        ));
    } catch (error) {

    }
}
export default function* messageWatcher() {
    yield takeEvery(sli.getMessages, getMessagesSaga);
    yield takeLatest(sli.sendMessages, sendMessageSaga);
}