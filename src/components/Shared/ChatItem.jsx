import { Box, Stack, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";

// Styled Motion Div
const StyledMotionDiv = styled(motion.div)(({ theme, sameSender }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0.8rem 1.2rem",
  borderRadius: "8px",
  backgroundColor: sameSender ? "#d8d8d8" : "#f0f0f0",
  color: "#333",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
  position: "relative",
  "&:hover": {
    backgroundColor: "#e5e7eb",
  },
}));

const ChatItem = ({
  avatar = [],
  name = "",
  _id,
  groupchat,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: "0", textDecoration: "none" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupchat)}
    >
      <StyledMotionDiv
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, delay: index * 0.1 }}
        sameSender={sameSender}
      >
        <AvatarCard avatar={avatar} />

        <Stack spacing={0.5} sx={{ marginLeft: "1rem", flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500", color: "#333" }}
          >
            {name}
          </Typography>
          {newMessageAlert && (
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {newMessageAlert.count} New Message
              {newMessageAlert.count > 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "success.main",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              boxShadow: "0 0 4px rgba(0, 128, 0, 0.3)",
            }}
          />
        )}
      </StyledMotionDiv>
    </Link>
  );
};

export default memo(ChatItem);
