import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  userName: "",
  firstName: "",
  lastName: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login: {
      prepare(userName, firstName, lastName, token) {
        return {
          payload: {
            userName,
            firstName,
            lastName,
            token,
          },
        };
      },
      reducer(state, action) {
        if (state.isAuth) return;
        state.isAuth = true;
        state.firstName = action.payload.firstName;
        state.userName = action.payload.userName;
        state.token = action.payload.token;
        state.lastName = action.payload.lastName;
      },
    },
    LogOut(state) {
      state.isAuth = false;
      state.firstName = "";
      state.userName = "";
      state.lastName = "";
    },
    updateUser: {
      prepare(firstName, lastName, userName) {
        return {
          payload: {
            userName,
            firstName,
            lastName,
          },
        };
      },
      reducer(state, action) {
        if (!state.isAuth) return;
        state.firstName = action.payload.firstName;
        state.userName = action.payload.userName;
        state.lastName = action.payload.lastName;
      },
    },
  },
});

export const getUser = (state) => state.user;

export const { Login, updateUser, LogOut } = userSlice.actions;

export default userSlice.reducer;
