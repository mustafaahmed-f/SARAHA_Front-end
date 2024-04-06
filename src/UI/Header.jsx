import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  //=================================================================================
  //=================================================================================

  //// Function to perform dark mode ////////////////

  const performDarkMode = useCallback(function performDarkMode() {
    localStorage.setItem("theme", "Dark");
    document.documentElement.classList.add("dark");
    setDark(true);
  }, []);

  //// Function to perform light mode  ///////////////

  const performLightMode = useCallback(function performLightMode() {
    localStorage.setItem("theme", "Light");
    document.documentElement.classList.remove("dark");
    setDark(false);
  }, []);

  //// Function to toggle mode /////////////////

  function toggleDark() {
    localStorage.getItem("theme") === "Light"
      ? performDarkMode()
      : performLightMode();
  }

  //// Function for intial theme  /////////////////

  function intialTheme() {
    console.log(localStorage.getItem("theme"));
    if (
      localStorage.getItem("theme") === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      performDarkMode();
    } else if (localStorage.getItem("theme")) {
      localStorage.getItem("theme") === "Dark"
        ? performDarkMode()
        : performLightMode();
    }
  }

  useEffect(function () {
    intialTheme();
  }, []);

  //=================================================================================
  //=================================================================================

  return (
    <header className="flex justify-between bg-teal-300 align-middle dark:bg-slate-950">
      <Link to="/">
        <img className="w-24" src="./logo_nav.png" />
      </Link>
      <div className="flex flex-wrap text-center align-middle">
        <div></div>

        <span
          className="flex cursor-pointer pr-2 pt-2 align-middle text-2xl"
          onClick={toggleDark}
        >
          {!dark ? "🌙" : "🌞"}
        </span>
      </div>
    </header>
  );
}

export default Header;
