export function refreshToken(data) {
  if (data.message === "Token Refreshed !!") {
    localStorage.setItem("sarahaLoginToken", data.userToken);
    return true;
  } else {
    return false;
  }
}
