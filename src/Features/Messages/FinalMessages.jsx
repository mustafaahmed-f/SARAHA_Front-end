import { useLoaderData } from "react-router-dom";
import {
  getReceivedMessages,
  getSentMessages,
  numOfReceivedMessages,
  numOfSentMessages,
} from "../../Services/messagesAPIs";
import ShowMessages from "./ShowMessages";
import { useEffect, useRef, useState } from "react";

import useMessages from "../../Hooks/useMessages";
import { useSelector } from "react-redux";
import SortMessages from "./SortMessages";
import MessagesPagination from "../../UI/MessagesPagination";

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
    sort,
    setSort,
    getMessages,
    totalPages,
    setTotalPages,
  } = useMessages({ intialMsg: initialMessages, initialIsReceived: received });

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
  async function getTotalPagesFunc() {
    try {
      const numberOfPages = received
        ? await numOfReceivedMessages({ token })
        : await numOfSentMessages({ token });

      setTotalPages(numberOfPages.number);
    } catch (error) {
      throw new Error(error || "Error");
    }
  }

  useEffect(function () {
    getTotalPagesFunc();
  }, []);

  useEffect(
    function () {
      getMessagesFunc();
    },
    [page, sort, token],
  );

  return (
    <div className="py-2 md:py-4">
      <div className="flex w-full justify-center md:justify-end">
        {messages?.length && <SortMessages sort={sort} setSort={setSort} />}
      </div>
      {loading ? (
        <p className="py-2 text-center text-black dark:text-white md:py-4">
          Loading ...
        </p>
      ) : messages?.length ? (
        <ShowMessages
          messages={messages}
          isReceived={received}
          getMessagesFunc={getMessagesFunc}
          getTotalPagesFunc={getTotalPagesFunc}
        />
      ) : (
        <p className="py-2 text-center text-black dark:text-white md:py-4">
          Your inbox is empty
        </p>
      )}
      {!loading && messages?.length && (
        <MessagesPagination totalPages={totalPages} />
      )}
    </div>
  );
}

export async function receivedLoader({ params }) {
  try {
    const messages = await getReceivedMessages({ token: params.token });
    return messages.messages;
  } catch (error) {
    throw new Error(error || "Error");
  } finally {
    return null;
  }
}

export async function sentLoader({ params }) {
  try {
    const messages = await getSentMessages({ token: params.token });
    return messages.messages;
  } catch (error) {
    throw new Error(error || "Error");
  } finally {
    return null;
  }
}

export default FinalMessages;
