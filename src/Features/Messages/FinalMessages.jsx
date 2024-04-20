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

  //// This hook is used to handle messages, sort and pagination.
  const { page, setPage, messages, setMessages, sort, setSort, getMessages } =
    useMessages({ intialMsg: initialMessages, initialIsReceived: received });

  useEffect(
    function () {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      getMessages({ token, sort, page });
    },
    [page, sort, token],
  );

  return (
    <div className="py-4">
      <div className="flex w-full justify-center md:justify-end">
        <SortMessages sort={sort} setSort={setSort} />
      </div>
      {messages ? (
        <ShowMessages messages={messages} isReceived={received} />
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
