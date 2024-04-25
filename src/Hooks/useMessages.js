import { useCallback, useRef, useState } from "react";
import {
  getReceivedMessages,
  getSentMessages,
  numOfReceivedMessages,
  numOfSentMessages,
} from "../Services/messagesAPIs";

export function useMessages({ intialMsg, initialIsReceived, token }) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState(intialMsg);
  const [sort, setSort] = useState("new");
  const [isReceived] = useState(initialIsReceived);
  const [numOfMessages, setNumOfMessages] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFirstRender = useRef(true);

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

  //// Function for rendering messages at initial render or change of one of these properties ( page, sort, token )

  async function getMessagesFunc() {
    try {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      setLoading(true);
      await getMessages({ token, sort, page });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error || "Error");
    } finally {
      setLoading(false);
    }
  }

  ////function for getting total pages and passing it to the pagination component
  async function getNumOfMessagesFunc() {
    try {
      const numberOfPages = initialIsReceived
        ? await numOfReceivedMessages({ token })
        : await numOfSentMessages({ token });

      setNumOfMessages(numberOfPages.number);
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
    numOfMessages,
    setNumOfMessages,
    loading,
    setLoading,
    getMessagesFunc,
    getNumOfMessagesFunc,
  };
}
