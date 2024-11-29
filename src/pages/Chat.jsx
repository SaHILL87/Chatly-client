import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Box, Skeleton, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

import MessageComponent from "../components/Shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { getSocket } from "../socket";
import {
  alert,
  newMessage,
  START_TYPING,
  STOP_TYPING,
} from "../constants/event";
import { TypingLoader } from "../components/Layout/Loaders";
import {
  useGetChatDetailsQuery,
  useGetMyMessagesQuery,
} from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import FileMenu from "../components/dialog/FileMenu";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { useNavigate } from "react-router-dom";

const Chat = ({ chat_id, confirm }) => {
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileAnchor, setFileAnchor] = useState(null);

  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatDetails = useGetChatDetailsQuery({ chat_id });
  const oldMessagesChunk = useGetMyMessagesQuery({
    chat_id,
    page,
    skip: !chat_id,
  });

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const bottomRef = useRef(null);

  const handleAttachments = (e) => {
    dispatch(setIsFileMenu(true));
    setFileAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(newMessage, { chat_id, message, members });

    setMessage("");
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chat_id });
      setIAmTyping(true);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chat_id });
      setIAmTyping(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chat_id));
    return () => {
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      setMessage("");
    };
  }, [chat_id]);

  const newMessageFunction = useCallback(
    (data) => {
      if (data?.chat_id !== chat_id) return;
      setMessages((prev) => [...prev, data?.message]);
    },
    [chat_id]
  );
  const startTypingListener = useCallback(
    (data) => {
      if (data?.chat_id !== chat_id) return;
      setUserTyping(true);
    },
    [chat_id]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data?.chat_id !== chat_id) return;
      setUserTyping(false);
    },
    [chat_id]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chat_id !== chat_id) return;

      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "iamadmin",
          name: "Admin",
        },
        chat: chat_id,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chat_id]
  );

  const eventHandlers = {
    [newMessage]: newMessageFunction,
    [alert]: alertListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.message
  );

  const allMessages = [...oldMessages, ...messages];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    if (chatDetails.isError) {
      return navigate("/");
    }
  }, [chatDetails.isError]);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        spacing={"1rem"}
        padding={"1rem"}
        bgcolor={"#f7f7f7"}
        height={"90%"}
        onScroll={handleScroll}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "0.5rem",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: isScrolling ? "rgba(0,0,0,0.2)" : "transparent",
            borderRadius: "0.7rem",
            transition: "background-color 0.3s ease",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          // Firefox
          scrollbarWidth: "thin",
          scrollbarColor: isScrolling
            ? "rgba(0,0,0,0.2) transparent"
            : "transparent transparent",
          transition: "scrollbar-color 0.3s ease",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent message={i} confirm={confirm} key={i._id} />
        ))}

        {userTyping && <TypingLoader sameSender={false} />}

        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={submitHandler}
      >
        <IconButton
          sx={{
            color: "#007bff",
            padding: "0.5rem",
            borderRadius: "10%",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#e0e0e0",
            },
          }}
          onClick={handleAttachments}
        >
          <AttachFileIcon />
        </IconButton>

        <InputBox
          placeholder="Type a message..."
          sx={{
            flex: 1,
            marginX: "0.6rem",
            padding: "0.6rem",
            borderRadius: "0",
            boxShadow: "none",
          }}
          value={message}
          onChange={messageChangeHandler}
        />

        <IconButton
          type="submit"
          sx={{
            color: "#007bff",
            padding: "0.5rem",
            borderRadius: "10%",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#e0e0e0",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </form>
      <FileMenu anchorE1={fileAnchor} chatId={chat_id} />
    </>
  );
};

export default AppLayout()(Chat);
