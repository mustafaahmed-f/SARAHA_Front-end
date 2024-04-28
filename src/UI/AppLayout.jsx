import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Login } from "../Features/User/userSlice";
import { getUserData } from "../Services/userAPIs";
import store from "../store.js";
import Loader from "./Loader.jsx";

import ToggleLanguage from "./ToggleLanguage.jsx";

function AppLayout() {
  // const dispatch = useDispatch();
  const navigation = useNavigation();

  //// Function to perform dark mode ////////////////

  const performDarkMode = useCallback(function performDarkMode() {
    localStorage.setItem("theme", "Dark");
    document.documentElement.classList.add("dark");
  }, []);

  //// Function to perform light mode  ///////////////

  const performLightMode = useCallback(function performLightMode() {
    localStorage.setItem("theme", "Light");
    document.documentElement.classList.remove("dark");
  }, []);

  //// Function for intial theme  /////////////////

  const intialTheme = useCallback(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "Dark") {
      performDarkMode();
    } else if (currentTheme === "Light") {
      performLightMode();
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      performDarkMode();
    } else {
      performLightMode();
    }
  }, []);

  useEffect(function () {
    intialTheme();
  }, []);

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

      <ToggleLanguage />

      <div className="overflow-x-hidden overflow-y-scroll py-5">
        <main className="mx-auto h-screen max-w-4xl px-6 py-1 lg:px-0">
          {navigation.state === "loading" ? <Loader /> : <Outlet />}
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
      console.log(error.message);
      if (
        error.message === "Token is not related to user or user is not found !!"
      ) {
        localStorage.removeItem("sarahaLoginToken");
        window.location.reload();
        return null;
      }
      throw new Error(error);
    }

    //// Handle case of token is not related to user in DB :

    if (userData.errMsg) {
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
