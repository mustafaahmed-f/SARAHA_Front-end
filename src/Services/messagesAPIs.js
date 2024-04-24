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

//==============================================================
//================== ReceivedMessages ==========================
//==============================================================

export async function getReceivedMessages({ token, sort = "new", page = 1 }) {
  try {
    const res = await fetch(
      `${baseURL}/saraha/msg/getMessages?page=${page}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${tokenBearer}${token}`,
        },
      },
    );

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      let baseURL = `${window.location.protocol}//${window.location.host}/messages/receivedMessages/${finalData.userToken}`;
      const newURL = window.location.href.replace(
        window.location.href,
        baseURL,
      );
      window.location.href = newURL;

      const newData = await getReceivedMessages({
        token: finalData.userToken,
        sort,
        page,
      });
      return newData;
    }
    //// In case of no refresh token, return data directly :
    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}

//==============================================================
//====================== sent Messages =========================
//==============================================================

export async function getSentMessages({ token, sort = "new", page = 1 }) {
  try {
    const res = await fetch(
      `${baseURL}/saraha/msg/getSentMessages?page=${page}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${tokenBearer}${token}`,
        },
      },
    );

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      let baseURL = `${window.location.protocol}//${window.location.host}/messages/sentMessages/${finalData.userToken}`;
      const newURL = window.location.href.replace(
        window.location.href,
        baseURL,
      );
      window.location.href = newURL;

      const newData = await getSentMessages({
        token: finalData.userToken,
        sort,
        page,
      });
      return newData;
    }
    //// In case of no refresh token, return data directly :

    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}

//==============================================================
//=============== Num. of Recieved messages ====================
//==============================================================

export async function numOfReceivedMessages({ token }) {
  try {
    const res = await fetch(`${baseURL}/saraha/msg/numOfMessages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenBearer}${token}`,
      },
    });

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      console.log(finalData.errMsg);
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await getSentMessages({
        token: finalData.userToken,
        sort,
        page,
      });
      return newData;
    }
    //// In case of no refresh token, return data directly :

    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}

//==============================================================
//================= Num. of Sent messages ======================
//==============================================================

export async function numOfSentMessages({ token }) {
  try {
    const res = await fetch(`${baseURL}/saraha/msg/numOfSentMessages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenBearer}${token}`,
      },
    });

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      console.log(finalData.errMsg);
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await getSentMessages({
        token: finalData.userToken,
        sort,
        page,
      });
      return newData;
    }
    //// In case of no refresh token, return data directly :

    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}

//==============================================================
//====================== Delete Message ========================
//==============================================================

export async function deleteMessage({ token, id }) {
  try {
    const res = await fetch(`${baseURL}/saraha/msg/deleteMessage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenBearer}${token}`,
      },
    });

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      console.log(finalData.errMsg);
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await deleteMessage({
        token: finalData.userToken,
        id,
      });
      return newData;
    }
    //// In case of no refresh token, return data directly :

    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}
