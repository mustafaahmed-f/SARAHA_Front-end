import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "flowbite";
import { disableLink } from "../utils/disableLink";
// initialize components based on data attribute selectors

function NavItems() {
  const user = useSelector((state) => state.user);

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
              Edit Profile
            </Link>
            <Link
              to="/messages"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              Messages
            </Link>
          </div>
        ) : (
          <div className="flex h-full flex-row items-center">
            <Link
              to="/login"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="hover:text-teal-600 dark:hover:text-teal-300"
              onClick={disableLink}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default NavItems;
