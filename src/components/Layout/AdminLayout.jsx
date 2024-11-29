import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Group as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { adminLogout } from "../../redux/thunks/admin";
import { Link } from "../styles/StyledComponents";

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack
      width={w}
      direction={"column"}
      p={"2rem"}
      spacing={"2rem"}
      sx={{
        bgcolor: "#f7f7f7",
        height: "100%",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: { xs: "0", md: "10px" },
      }}
    >
      <Typography variant="h5" sx={{ color: "#1a1a1a", fontWeight: "bold" }}>
        Chatly
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#1a1a1a",
              bgcolor:
                location.pathname === tab.path ? "#e3f2fd" : "transparent",
              ":hover": {
                bgcolor: "#e3f2fd",
                color: "#1a1a1a",
              },
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}

              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}

        <Link
          onClick={logOutHandler}
          sx={{
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#1a1a1a",
            ":hover": {
              bgcolor: "#e3f2fd",
              color: "#1a1a1a",
            },
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />

            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              Log Out
            </Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to={"/admin"} />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          padding: "1rem",
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f7f7f7",
          padding: "2rem",
          borderRadius: { xs: "0", md: "10px" },
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="70vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
