import DeleteIcon from "@mui/icons-material/Delete";

function Message({ msg, sentBy }) {
  return (
    <div className="grid h-fit grid-cols-[1fr_auto] gap-2  rounded-md bg-slate-300 pb-2 dark:bg-slate-600">
      <div className="flex flex-col overflow-hidden ">
        <div className="mb-2 w-fit rounded-tl-md bg-slate-400 p-3 text-sm dark:bg-slate-700 dark:text-slate-50">
          <span className="font-semibold ">Sent By : </span>
          {sentBy ?? "Anonymous"}
        </div>
        <div className="p-2 dark:text-slate-50">
          <p>{msg}</p>
        </div>
      </div>
      <div className="flex h-full flex-col justify-center p-4 ">
        <span className="cursor-pointer">
          <DeleteIcon color="error" />
        </span>
      </div>
    </div>
  );
}

export default Message;
