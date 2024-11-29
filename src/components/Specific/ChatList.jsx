import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../Shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chat_id,
  onlineUsers = [],
  newMessagesAlert = [{ chat_id: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction="column" height={"100%"} overflow={"auto"}>
      {chats.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chat_id }) => chat_id === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupchat={groupChat}
            sameSender={chat_id === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
