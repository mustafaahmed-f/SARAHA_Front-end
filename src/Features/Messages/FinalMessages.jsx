import { useLoaderData } from "react-router-dom";
import {
  getReceivedMessages,
  getSentMessages,
} from "../../Services/messagesAPIs";
import ShowMessages from "./ShowMessages";
import { useEffect, useRef, useState } from "react";
import { useMessagesContext } from "../../Contexts/messagesContext";
import useMessages from "../../Hooks/useMessages";
import { useSelector } from "react-redux";
import SortMessages from "./SortMessages";

function FinalMessages({ received }) {
  //// This component is used to show messages ( Received or Sent ) in UI.
  //// received prop is used to specify whether messages are received or sent.
  //// received === true ==> received messages are rendered
  //// received === false ==> sent messages are rendered
  const isFirstRender = useRef(true);
  const initialMessages = useLoaderData();
  const token = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);

  //// This hook is used to handle messages, sort and pagination.
  const {
    page,
    setPage,
    messages,
    setMessages,
    sort,
    setSort,
    getMessages,
    totalPages,
    setTotalPages,
  } = useMessages({ intialMsg: initialMessages, initialIsReceived: received });

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

  async function getTotalPagesFunc() {
    try {
      await getMessages({ token, sort, page: 1 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(
    function () {
      getMessagesFunc();
    },
    [page, sort, token],
  );

  return (
    <div className="py-2 md:py-4">
      <div className="flex w-full justify-center md:justify-end">
        <SortMessages sort={sort} setSort={setSort} />
      </div>
      {loading ? (
        <p className="py-2 text-center text-black dark:text-white md:py-4">
          Loading ...
        </p>
      ) : messages ? (
        <ShowMessages
          messages={messages}
          isReceived={received}
          getMessagesFunc={getMessagesFunc}
        />
      ) : null}
    </div>
  );
}

export async function receivedLoader({ params }) {
  try {
    const messages = await getReceivedMessages({ token: params.token });
    return messages.messages;
  } catch (error) {
    throw new Error(error || "Error");
  }
}

export async function sentLoader({ params }) {
  try {
    const messages = await getSentMessages({ token: params.token });
    return messages.messages;
  } catch (error) {
    throw new Error(error || "Error");
  }
}

export default FinalMessages;
