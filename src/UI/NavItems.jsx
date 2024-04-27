import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "flowbite";
import { disableLink } from "../utils/disableLink";
import { LogOut } from "../Features/User/userSlice";
import { useTranslation } from "react-i18next";
// initialize components based on data attribute selectors

function NavItems() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function Logout() {
    dispatch(LogOut());
    localStorage.removeItem("sarahaLoginToken");
    window.location.reload();
  }

  return (
    <>
      <div className="hidden md:flex md:justify-center">
        {user.isAuth ? (
          <div className="flex h-full flex-row items-center gap-5">
            <Link
              to="/editProfile"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              {t("Edit Profile")}
            </Link>
            <Link
              to="/messages"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              {t("Messages")}
            </Link>
            <Link
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={Logout}
            >
              {t("Log out")}
            </Link>
          </div>
        ) : (
          <div className="flex h-full flex-row items-center gap-5">
            <Link
              to="/login"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              {t("Log in")}
            </Link>
            <Link
              to="/signup"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              {t("Sign up")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default NavItems;
