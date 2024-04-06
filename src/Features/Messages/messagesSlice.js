import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  received: 0,
  sent: 0,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateMessages: {
      prepare(sent, received) {
        return {
          payload: { sent, received },
        };
      },
      reducer(state, action) {
        state.received = action.payload.received ?? state.received;
        state.sent = action.payload.sent ?? state.sent;
      },
    },
    receiveMsg(state) {
      state.received++;
    },
    sendMsg(state) {
      state.sent++;
    },
  },
});

export const { sendMsg, receiveMsg, updateMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
