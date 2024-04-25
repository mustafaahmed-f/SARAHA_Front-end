import { memo } from "react";
import Message from "./Message";

function ShowMessages({
  messages,
  isReceived,
  getMessagesFunc,
  getNumOfMessagesFunc,
}) {
  return (
    <div className="mt-2 flex flex-col justify-center py-2 md:mt-4">
      <div className="my-auto flex max-h-[600px] flex-col gap-3 overflow-x-hidden overflow-y-scroll rounded-md bg-white bg-opacity-90 px-5 py-5 opacity-80 backdrop-blur-xl dark:bg-opacity-30 md:px-9 lg:py-10">
        {messages?.map((el) => (
          <Message
            messageElement={el}
            key={el._id}
            isReceived={isReceived}
            getMessagesFunc={getMessagesFunc}
            getNumOfMessagesFunc={getNumOfMessagesFunc}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowMessages;
