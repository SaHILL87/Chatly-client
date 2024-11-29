import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/SampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import toast from "react-hot-toast";

const Notifications = ({ open, onClose }) => {
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    onClose();
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.sucess) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useErrors([{ isError, error }]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={"35rem"}
        width="100%"
        spacing={2}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Notifications
        </DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map((notification) => (
                <NotificationItem
                  sender={notification.sender}
                  _id={notification._id}
                  handler={friendRequestHandler}
                  key={notification._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export default Notifications;

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem
      sx={{
        borderBottom: "1px solid #f0f0f0",
        padding: "1rem 0",
      }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >{`${name} sent you a friend request.`}</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            sx={{
              bgcolor: "#1E90FF",
              color: "white",
              "&:hover": {
                bgcolor: "#1C86EE",
              },
              padding: "0.5rem 1rem",
              textTransform: "none",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
            }}
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button
            sx={{
              bgcolor: "#F5F5F5",
              color: "#555",
              "&:hover": {
                bgcolor: "#E0E0E0",
              },
              padding: "0.5rem 1rem",
              textTransform: "none",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
            }}
            onClick={() => handler({ _id, accept: false })}
          >
            Decline
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
