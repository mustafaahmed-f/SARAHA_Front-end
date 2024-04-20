import { useState } from "react";
import { getReceivedMessages, getSentMessages } from "../Services/messagesAPIs";

function useMessages({ intialMsg, initialIsReceived }) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState(intialMsg);
  const [sort, setSort] = useState("new");
  const [isReceived] = useState(initialIsReceived);

  //// Is received used to specify if messages to be fetched are sent or received.

  async function getMessages({ token, sort, page }) {
    try {
      const messages = isReceived
        ? await getReceivedMessages({ token, page, sort })
        : await getSentMessages({ token, page, sort });

      setMessages(messages.messages);
    } catch (error) {
      throw new Error(error || "Error");
    }
  }

  return {
    page,
    setPage,
    messages,
    setMessages,
    sort,
    setSort,
    isReceived,
    getMessages,
  };
}

export default useMessages;
