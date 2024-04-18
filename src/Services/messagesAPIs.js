import { refreshToken } from "./tokenRefresh";

let baseURL = "http://localhost:5000";
let tokenBearer = "MustafaaaaaaAa__";

//==============================================================
//======================= sendMessage ==========================
//==============================================================

export async function sendMessage({ token, username, messageBody }) {
  let headersObj = {
    "Content-Type": "application/json",
  };
  if (token) {
    headersObj.authorization = `${tokenBearer}${token}`;
  }
  try {
    const res = await fetch(`${baseURL}/saraha/msg/sendMessage/${username}`, {
      method: "POST",
      headers: { ...headersObj },
      body: JSON.stringify(messageBody),
    });

    const finalData = await res.json();
    console.log(finalData);
    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      console.log(finalData.errMsg);
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await sendMessage({
        username,
        token: finalData.userToken,
        messageBody,
      });
      return newData;
    }
    //// In case of no refresh token, return data directly :

    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}
