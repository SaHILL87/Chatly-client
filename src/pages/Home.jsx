import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Typography, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      bgcolor="#f0f4f8" // Softer background color for a smoother look
      p={4}
      textAlign="center"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" // Subtle, less harsh shadow
      gap={2} // Adding some spacing between the components for better flow
    >
      <ChatIcon sx={{ fontSize: 80, color: "#1E90FF", mb: 2 }} />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Welcome to Chatly
      </Typography>
      <Typography variant="body1" sx={{ color: "#666" }}>
        Select a friend to start chatting
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
