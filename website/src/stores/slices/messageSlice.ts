import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypeGet } from "@/types/constants/user";
import { MessageType } from "@/types/constants/message";
import { UserMessState } from "@/types/slices/user.message.slice";

const initialState = {
    userMessState: [] as UserMessState[]
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {

      // Get messages
      getMessages(state, action: PayloadAction<UserTypeGet>) {},
      getMessagesSucess(state, action: PayloadAction<UserMessState[]>) {
        state.userMessState = action.payload;
      },

      // Add new message
      sendMessages(state, action: PayloadAction<MessageType>){},
      sendMessagesSuccess(state, action: PayloadAction<MessageType>){
        state.userMessState.forEach((item) => {
            if(item.userQuery.id === action.payload.userSendId && item.userReceived.id === action.payload.userReceiveId){
              item.messages = [...item.messages, action.payload];
              return;
            }
        })
      },

    }
});

export const { getMessages, getMessagesSucess, sendMessages, sendMessagesSuccess } = messageSlice.actions;

export const messageSelected = (state: any): UserMessState => state.userMessState;

const messageReducer = messageSlice.reducer;
export default messageReducer;