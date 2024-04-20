import { memo } from "react";
import Message from "../../UI/Message";

const ShowMessages = memo(function ShowMessages({ messages, isReceived }) {
  return (
    <div className="mt-4 flex flex-col justify-center py-2">
      <div className="my-auto flex max-h-[600px] flex-col gap-3 overflow-x-hidden overflow-y-scroll rounded-md bg-white bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl dark:bg-opacity-30 lg:py-10">
        {messages?.map((el) => (
          <Message
            sentBy={el?.sentBy?.userName ?? "Anonymous"}
            sentTo={el?.sentTo}
            key={el._id}
            msg={el.content}
            isReceived={isReceived}
          />
        ))}
      </div>
    </div>
  );
});

export default ShowMessages;
