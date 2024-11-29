import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../../lib/Features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  const buttonStyles = {
    bgcolor: isAdded ? "#FF6347" : "#1E90FF",
    color: "white",
    "&:hover": {
      bgcolor: isAdded ? "#FF4500" : "#1C86EE",
    },
    ...(handlerIsLoading && { cursor: "wait" }),
  };

  return (
    <ListItem>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        width={"100%"}
        {...styling}
      >
        <Avatar
          src={avatar?.url ? transformImage(avatar.url) : "/default-avatar.png"}
        />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          sx={buttonStyles}
          aria-label={isAdded ? "Remove user" : "Add user"}
        >
          {handlerIsLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isAdded ? (
            <RemoveIcon />
          ) : (
            <AddIcon />
          )}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
