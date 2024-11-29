import { Box, Tooltip, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/Features";
import RenderAttachment from "./renderAttachment";

// Styled Motion Div
const StyledMotionDiv = styled(motion.div)(({ theme, sameSender }) => ({
  alignSelf: sameSender ? "flex-end" : "flex-start",
  backgroundColor: sameSender ? "#007bff" : "#f1f1f1",
  color: sameSender ? "#ffffff" : "#333333",
  borderRadius: "12px",
  padding: "0.75rem 1rem",
  maxWidth: "65%",
  marginBottom: "0.6rem",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
  display: "flex",
  flexDirection: "column",
  overflowWrap: "break-word",
  "& a": {
    color: sameSender
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    textDecoration: "underline",
  },
  "&:hover": {
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
}));

const MessageComponent = ({ message, confirm }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender._id === confirm?._id;
  const timeAgo = moment(createdAt).fromNow();
  const sentTime = moment(createdAt).calendar({
    sameDay: "[Today at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "dddd [at] LT",
    sameElse: "DD/MM/YYYY [at] LT",
  });

  return (
    <StyledMotionDiv
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      sameSender={sameSender}
    >
      {!sameSender && (
        <Typography
          fontWeight={600}
          color="#007bff"
          variant="caption"
          sx={{ marginBottom: "0.2rem" }}
        >
          {sender.name}
        </Typography>
      )}
      {content && (
        <Typography
          sx={{ fontSize: "0.95rem", lineHeight: 1.4, marginBottom: "0.5rem" }}
        >
          {content}
        </Typography>
      )}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index} mt={0.5}>
              <a href={url} target="_blank" download>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
          alignItems: sameSender ? "flex-end" : "flex-start",
        }}
      >
        <Tooltip title={sentTime} arrow>
          <Typography
            variant="caption"
            color={sameSender ? "#bbdefb" : "#555555"}
            sx={{ fontSize: "0.75rem", cursor: "pointer" }}
          >
            {timeAgo}
          </Typography>
        </Tooltip>
      </Box>
    </StyledMotionDiv>
  );
};

export default memo(MessageComponent);
