let baseURL = "http://localhost:5000";

export async function signUp(data) {
  try {
    const res = await fetch(`${baseURL}/saraha/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const finalData = await res.json();
    if (finalData.errMsg) {
      if (finalData.errMsg === "Validation Error") {
        console.table(finalData.Errors);
      }
      throw new Error(finalData.errMsg);
    }
    return finalData;
  } catch (error) {
    throw Error(error);
  }
}

export async function logIn(data) {
  try {
    const res = await fetch(`${baseURL}/saraha/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const finalData = await res.json();
    return finalData;
  } catch (error) {
    throw Error(error);
  }
}
