import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  newMessageAlert,
  newRequestAlert,
  refetchChats,
  USER_OFFLINE,
  USER_ONLINE,
} from "../../constants/event";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromLocalStorage } from "../../lib/Features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialog/DeleteChatMenu";
import Title from "../Shared/Title";
import ChatList from "../Specific/ChatList";
import Profile from "../Specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chat_id = params.chatId;
    const navigate = useNavigate();

    const socket = getSocket();

    const deleteMenuAnchor = React.useRef(null);

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { confirm } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, isError, data, error, refetch } = useMyChatsQuery("");
    const [onlineUsers, setOnlineUsers] = React.useState([]);

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromLocalStorage({
        key: newMessageAlert,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    useEffect(() => {
      socket.emit(USER_ONLINE, confirm._id);
      socket.on(USER_ONLINE, (onlineUsersList) => {
        setOnlineUsers(onlineUsersList);
      });
      socket.on(USER_OFFLINE, (onlineUsersList) => {
        setOnlineUsers(onlineUsersList);
      });
    }, [socket, confirm._id]);

    const handleDeleteChat = (e, chat_id, groupchat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chat_id, groupchat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobileMenu(false));
    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chat_id === chat_id) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chat_id]
    );

    const refetchChatsListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const newRequestAlertHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const eventHandlers = {
      [newMessageAlert]: newMessagesAlertHandler,
      [newRequestAlert]: newRequestAlertHandler,
      [refetchChats]: refetchChatsListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chat_id={chat_id}
              onlineUsers={onlineUsers}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}
        <Grid
          container
          height={"calc(100vh - 4rem)"}
          sx={{ bgcolor: "#f5f5f5" }}
        >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
              overflowY: "auto",
              bgcolor: "#ffffff",
              boxShadow: "0.1rem 0 0.3rem rgba(0,0,0,0.1)",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chat_id={chat_id}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <WrappedComponent {...props} chat_id={chat_id} confirm={confirm} />
          </Grid>

          <Grid
            item
            xs={4}
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "#fafafa",
              borderLeft: "1px solid #e0e0e0",
              boxShadow: "-0.1rem 0 0.3rem rgba(0,0,0,0.1)",
            }}
          >
            <Profile confirm={confirm} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
