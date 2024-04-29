import { useLoaderData } from "react-router-dom";
import {
  getReceivedMessages,
  getSentMessages,
} from "../../Services/messagesAPIs";
import ShowMessages from "./ShowMessages";
import { useEffect } from "react";

import { useMessages } from "../../Hooks/useMessages";
import { useSelector } from "react-redux";
import SortMessages from "./SortMessages";
import MessagesPagination from "../../UI/MessagesPagination";
import { useTranslation } from "react-i18next";

function FinalMessages({ received }) {
  //// This component is used to show messages ( Received or Sent ) in UI.
  //// received prop is used to specify whether messages are received or sent.
  //// received === true ==> received messages are rendered
  //// received === false ==> sent messages are rendered
  const initialMessages = useLoaderData();
  const token = useSelector((state) => state.user.token);

  console.log("Initial messages", initialMessages);

  //// This hook is used to handle messages, sort and pagination.
  const {
    page,
    setPage,
    messages,
    sort,
    setSort,
    numOfMessages,
    loading,
    getMessagesFunc,
    getNumOfMessagesFunc,
  } = useMessages({
    intialMsg: initialMessages,
    initialIsReceived: received,
    token: token,
  });

  const { t, i18n } = useTranslation();

  useEffect(
    function () {
      getNumOfMessagesFunc();
      console.log("useEffect used to get num. of messages");
    },
    [token],
  );

  useEffect(
    function () {
      getMessagesFunc();
      console.log("useEffect used to get messages");
    },
    [page, sort, token],
  );

  console.log("Messages", messages);

  return (
    <div className="py-2 md:py-4">
      <div className="flex w-full justify-center md:justify-end">
        {messages?.length && <SortMessages sort={sort} setSort={setSort} />}
      </div>
      {loading ? (
        <div className="min-h-[600px]">
          <span className="loader"></span>
        </div>
      ) : messages?.length ? (
        <ShowMessages
          messages={messages}
          isReceived={received}
          getMessagesFunc={getMessagesFunc}
          getNumOfMessagesFunc={getNumOfMessagesFunc}
          setPage={setPage}
        />
      ) : (
        <p className="py-2 text-center text-black dark:text-white md:py-4">
          {t("Your inbox is empty")}
        </p>
      )}
      {messages?.length && (
        <MessagesPagination
          numOfMessages={numOfMessages}
          numOfPageElements={6}
          setPage={setPage}
          loading={loading}
          page={page}
        />
      )}
    </div>
  );
}

export async function receivedLoader({ params }) {
  try {
    const messages = await getReceivedMessages({ token: params.token });
    return messages.messages || null;
  } catch (error) {
    return new Error(error || "Error");
  }
  // return null;
}

export async function sentLoader({ params }) {
  try {
    const messages = await getSentMessages({ token: params.token });
    return messages.messages || null;
  } catch (error) {
    return new Error(error || "Error");
  }
  // return null;
}

export default FinalMessages;
