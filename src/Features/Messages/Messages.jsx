import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

function Messages() {
  const [copied, setCopied] = useState(false);
  const username = useSelector((store) => store.user).userName;
  const token = useSelector((store) => store.user).token;
  const linkElement = useRef();

  function handleCopyText(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((err) => console.error(err));
  }

  useEffect(
    function () {
      if (copied) {
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    },
    [copied],
  );

  return (
    <div className="flex flex-col rounded-md bg-slate-50 p-4 dark:bg-slate-800 ">
      <h2 className="mb-6 text-center text-3xl dark:text-slate-300 lg:text-4xl">
        My messages
      </h2>
      <div className="mb-6 flex justify-center">
        <img
          src="../../../public/new_male.jpg"
          className="w-20 dark:brightness-75 dark:filter md:w-36"
        />
      </div>

      {/*========================== send message link ================================== */}
      <div className="mb-3 flex flex-wrap justify-center gap-2 align-middle">
        <p className="text-slate-950 dark:text-slate-50">Sarehny : </p>
        <div className="mx-1 md:mx-3 ">
          <Link
            className="text-slate-950 underline underline-offset-1 hover:text-indigo-500 dark:text-slate-50 hover:dark:text-indigo-700"
            to={`/sendMsg/${username}`}
            ref={linkElement}
            target="_blank"
          >{`${window.location.protocol}//${window.location.host}/sendMsg/${username}`}</Link>
        </div>

        <span
          className="cursor-pointer"
          onClick={() => {
            if (copied) return;
            handleCopyText(linkElement.current.innerText);
          }}
        >
          {!copied ? (
            <ContentCopyIcon color="info" />
          ) : (
            <CheckIcon color="info" />
          )}
        </span>
      </div>

      {/* ======================== Show messages options ========================= */}

      <div className="mx-auto grid w-1/2 grid-cols-2 gap-2 rounded-lg bg-slate-300 px-2 py-1 dark:bg-slate-600">
        <div className="flex justify-center py-[1px] align-middle">
          <NavLink
            className="text- mx-auto h-full w-full rounded-md text-center text-slate-950 dark:text-slate-50"
            to={`sentMessages/${token}`}
          >
            Sent
          </NavLink>
        </div>
        <div className="flex justify-center py-[1px] align-middle">
          <NavLink
            className="text- mx-auto h-full w-full rounded-md text-center text-slate-950 dark:text-slate-50"
            to={`receivedMessages/${token}`}
          >
            Received
          </NavLink>
        </div>
      </div>

      {/* ============= Show messages section ========================== */}

      <Outlet />
    </div>
  );
}

export default Messages;
