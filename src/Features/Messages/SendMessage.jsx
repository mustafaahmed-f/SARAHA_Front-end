import { useState } from "react";
import Button from "../../Reusable components/Button";
import { useParams } from "react-router-dom";
import { checkUserName } from "../../Services/userAPIs";
import { useSelector } from "react-redux";
import { sendMessage } from "../../Services/messagesAPIs";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function SendMessage() {
  const [msg, setMsg] = useState("");
  const { userName } = useParams();
  const [anonymous, setAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);
  const loadingToast = toast;
  const { t, i18n } = useTranslation();

  let msgLength = msg.length;

  const handleSendMessage = async () => {
    if (!msgLength) return;
    try {
      setLoading(true);
      loadingToast.loading("Sending message ...");
      let result = await sendMessage({
        token: anonymous ? null : user.token ? user.token : null,
        username: userName,
        messageBody: { content: msg },
      });
      if (result) {
        setLoading(false);
        toast.dismiss(loadingToast);
        toast.success(result.message);
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss(loadingToast);
      toast.error(error || "Error");
      throw new Error(error.message || `"Error :" ${error} `);
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };
  // async function handleSendMessage() {
  //   if (!msgLength) return;
  //   try {
  //     setLoading(true);
  //     loadingToast.loading("Sending message ...");
  //     let result = await sendMessage({
  //       token: user.token,
  //       username: userName,
  //       message: msg,
  //     });
  //     if (result) {
  //       setLoading(false);
  //       toast.dismiss(loadingToast);
  //       toast.success(result.message);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.dismiss(loadingToast);
  //     toast.error(error || "Error");
  //   } finally {
  //     setLoading(false);
  //     toast.dismiss(loadingToast);
  //   }
  // }

  return (
    <div className="flex flex-col gap-10 rounded-md bg-slate-50 p-4 py-8 text-black dark:bg-slate-900 dark:text-white md:gap-14">
      <h2 className="text-center text-2xl font-bold">
        {t("Send a message to")} <span className="font-light">{userName}</span>
      </h2>
      <div className="flex flex-col gap-5">
        <textarea
          minLength={0}
          maxLength={1000}
          placeholder="Send a message ..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          className="h-40 w-full rounded-md border-2 border-slate-300 bg-slate-50 p-3 text-black dark:bg-slate-800 dark:text-white"
        />
        <div className="flex flex-wrap justify-between align-middle">
          <div className="flex flex-row gap-2 align-middle">
            <input
              type="checkbox"
              // value={anonymous}
              checked={anonymous}
              disabled={!user.isAuth}
              onChange={(e) => {
                if (!user.isAuth) return;
                setAnonymous(e.target.checked);
              }}
            />
            <span>{t("Send anonymously")}</span>
          </div>
          <div>{msgLength} / 1000</div>
        </div>
      </div>

      <button
        onClick={handleSendMessage}
        className={`w-full rounded-full bg-teal-400 px-7 py-2 hover:${!msgLength ? "" : "bg-teal-600"} dark:bg-slate-950 dark:text-white dark:hover:${!msgLength ? "" : "bg-slate-800"} sm:w-fit`}
      >
        {loading ? `${t("Loading ...")}` : `${t("Send message")}`}
      </button>
    </div>
  );
}

export async function loader({ params }) {
  //   console.log(params.userName);
  try {
    await checkUserName(params.userName);
  } catch (error) {
    throw new Error(error || "Error", { status: 404 });
  }
  return null;
}

export default SendMessage;
