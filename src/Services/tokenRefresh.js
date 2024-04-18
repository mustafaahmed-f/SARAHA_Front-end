import { updateToken } from "../Features/User/userSlice";
import store from "../store";

export function refreshToken(data) {
  if (data.message === "Token Refreshed !!") {
    localStorage.setItem("sarahaLoginToken", data.userToken);
    store.dispatch(updateToken(data.userToken));
    return true;
  } else {
    return false;
  }
}
