import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Login } from "../Features/User/userSlice";
import { getUserData } from "../Services/userAPIs";
import store from "../store.js";
import { refreshToken } from "../Services/tokenRefresh.js";

function AppLayout() {
  // const dispatch = useDispatch();

  useEffect(function () {
    if (
      localStorage.getItem("theme") === "Dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // useEffect(function () {
  //   async function getUserFromToken() {
  //     if (localStorage.getItem("sarahaLoginToken")) {
  //       let token = localStorage.getItem("sarahaLoginToken");
  //       const userData = await getUserData(token);
  //       dispatch(
  //         Login(
  //           userData.user_Details.userName,
  //           userData.user_Details.firstName,
  //           token,
  //         ),
  //       );
  //       console.log(userData);
  //     }
  //   }

  //   getUserFromToken();
  // }, []);

  return (
    <div className="relative grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="absolute z-10">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
          }}
        />
      </div>

      <div className="overflow-x-hidden overflow-y-scroll py-5">
        <main className="mx-auto h-screen max-w-4xl px-6 py-1 lg:px-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;

export async function loader() {
  if (store.getState().user.isAuth) return null;
  if (localStorage.getItem("sarahaLoginToken")) {
    let token = localStorage.getItem("sarahaLoginToken");
    let userData;
    // let newUserData;
    try {
      userData = await getUserData(token);
    } catch (error) {
      throw new Error(error);
    }

    console.log(userData);

    //// Handle case of token is not related to user in DB :

    if (userData.errMsg === "Token is not related to user !!") {
      localStorage.removeItem("sarahaLoginToken");
      window.location.reload();
      return null;
    }

    store.dispatch(
      Login(
        userData.user_Details.userName,
        userData.user_Details.firstName,
        userData.user_Details.lastName,
        token,
      ),
    );
  }
  return null;
}
