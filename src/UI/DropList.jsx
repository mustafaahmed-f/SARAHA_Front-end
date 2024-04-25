import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DropList() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(function () {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative top-3 flex justify-center md:hidden"
      ref={dropdownRef}
    >
      <button
        className="absolute top-0 mx-auto inline-flex items-center rounded-lg bg-teal-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <svg
          className=" h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-9 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white text-center shadow dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {user.isAuth ? (
              <>
                <li>
                  <Link
                    to="/editProfile"
                    className="hover:text-teal-600 dark:hover:text-teal-300"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/messages"
                    className="hover:text-teal-600 dark:hover:text-teal-300"
                  >
                    Messages
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-teal-600 dark:hover:text-teal-300"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-teal-600 dark:hover:text-teal-300"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropList;
