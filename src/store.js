import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/User/userSlice";
import messagesReducer from "./Features/Messages/messagesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
  },
});

export default store;
