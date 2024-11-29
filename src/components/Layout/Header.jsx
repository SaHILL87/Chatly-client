import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth";
import { resetNotificationCount } from "../../redux/reducers/chat";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsSearch,
} from "../../redux/reducers/misc";

const Search = React.lazy(() => import("../Specific/Search"));
const Notifications = React.lazy(() => import("../Specific/Notifications"));
const NewGroup = React.lazy(() => import("../Specific/NewGroup"));

const Header = () => {
  const [isnotification, setisnotification] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
  };

  const openSearchDialogue = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const manageNotifications = () => {
    setisnotification((prev) => !prev);
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: "#0056b3" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
              onClick={navigateToHome}
            >
              Chatly
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: "1" }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialogue}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationIcon />}
                onClick={manageNotifications}
                value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logOutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search
            open={isSearch}
            onClose={() => dispatch(setIsSearch(false))}
          />
        </Suspense>
      )}

      {isnotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notifications
            open={isnotification}
            onClose={() => setisnotification(false)}
          />
        </Suspense>
      )}

      {NewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup
            open={NewGroup}
            onClose={() => dispatch(setIsNewGroup(false))}
          />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
