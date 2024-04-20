import { createContext, useContext, useState } from "react";
import { getSentMessages } from "../Services/messagesAPIs";

const messagesContext = createContext();

export function MessagesContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [sort, setSort] = useState("new");
  const [isReceived, setIsReceived] = useState(false);

  async function getMessages({ token, sort, page }) {
    try {
      const messages = isReceived
        ? await getReceivedMessages({ token, page, sort })
        : await getSentMessages({ token, page, sort });
      setMessages(messages);
    } catch (error) {
      throw new Error(error || "Error");
    }
  }

  const value = {
    page,
    setPage,
    messages,
    setMessages,
    sort,
    setSort,
    setIsReceived,
    getMessages,
  };

  return (
    <messagesContext.Provider value={value}>
      {children}
    </messagesContext.Provider>
  );
}

export function useMessagesContext() {
  const context = useContext(messagesContext);
  if (!context) {
    throw new Error(
      "useMessagesContext must be used within a MessagesContextProvider",
    );
  }
  return context;
}
