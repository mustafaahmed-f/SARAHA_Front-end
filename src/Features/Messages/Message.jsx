import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { deleteMessage } from "../../Services/messagesAPIs";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

function Message({
  isReceived,
  getNumOfMessagesFunc,
  getMessagesFunc,
  messageElement,
  messagesLength,
  setPage,
}) {
  const { sentTo, content, sentBy, _id } = messageElement;
  const [loading, setLoading] = useState(false);
  const token = useSelector((store) => store.user).token;

  async function handleDeleteMsg(id) {
    const loadingToast = toast.loading("Deleting message ...");
    try {
      setLoading(true);
      loadingToast;
      await deleteMessage({ token, id });
      toast.dismiss(loadingToast);
      toast.success("Message deleted successfully");

      setLoading(false);

      getNumOfMessagesFunc();

      messagesLength === 1 ? setPage((prev) => prev - 1) : getMessagesFunc();
    } catch (error) {
      setLoading(false);
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid h-fit grid-cols-[1fr_auto] gap-1 rounded-md  bg-slate-300 pb-2 dark:bg-slate-600 md:gap-2">
      <div className="flex flex-col overflow-hidden ">
        <div className="mb-2 w-fit rounded-tl-md bg-slate-400 p-3 text-xs dark:bg-slate-700 dark:text-slate-50 sm:text-sm">
          <span className="font-semibold ">
            {isReceived ? "Sent By : " : "Sent To : "}
          </span>
          {isReceived ? sentBy?.userName ?? "Anonymous" : sentTo ?? "Anonymous"}
        </div>
        <div className="p-2 text-sm dark:text-slate-50 md:text-lg">
          <p>{content}</p>
        </div>
      </div>
      <div className="flex h-full flex-col justify-center p-2 md:p-4 ">
        <span className="cursor-pointer">
          {loading ? (
            <HourglassBottomIcon color="disabled" />
          ) : (
            <div onClick={() => handleDeleteMsg(_id)}>
              <DeleteIcon color="error" />
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default Message;
