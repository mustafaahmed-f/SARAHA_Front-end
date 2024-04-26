import { refreshToken } from "./tokenRefresh";

let baseURL = import.meta.env.VITE_BASE_URL;
let tokenBearer = import.meta.env.VITE_BEARER_TOKEN;

//==============================================================
//==============================================================

export async function getUserData(token) {
  try {
    const res = await fetch(`${baseURL}/saraha/user/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenBearer}${token}`,
      },
    });

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await getUserData(finalData.userToken);
      return newData;
    }
    //// In case of no refresh token, return data directly :

    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}

//==============================================================
//==============================================================

export async function updateProfile(data, token) {
  try {
    const res = await fetch(`${baseURL}/saraha/user/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenBearer}${token}`,
      },
      body: JSON.stringify(data),
    });

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await updateProfile(data, finalData.userToken);
      return newData;
    }

    return finalData;
  } catch (error) {
    throw new Error(error);
  }
}

//==============================================================
//==============================================================

export async function updatePassword(data, token) {
  try {
    const res = await fetch(`${baseURL}/saraha/user/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenBearer}${token}`,
      },
      body: JSON.stringify(data),
    });

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      throw new Error(finalData.errMsg);
    }

    //// Handle refresh token case :

    if (refreshToken(finalData)) {
      const newData = await updatePassword(data, finalData.userToken);
      return newData;
    }

    return finalData;
  } catch (error) {
    throw new Error(error);
  }
}

//==============================================================
//==============================================================

export async function checkUserName(userName) {
  try {
    const res = await fetch(
      `${baseURL}/saraha/user/checkUserName?userName=${userName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const finalData = await res.json();

    //// Handle errMsg sent from APIs :

    if (finalData.errMsg) {
      throw new Error(finalData.errMsg);
    }

    return finalData;
  } catch (error) {
    throw new Error(error);
  }
}
