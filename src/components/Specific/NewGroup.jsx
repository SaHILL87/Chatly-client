import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import UserItem from "../Shared/UserItem";

const NewGroup = ({ open, onClose }) => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, newGroupIsLoading] = useAsyncMutation(useNewGroupMutation);

  const errors = [{ isError, error }];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Please enter group name");
    if (selectedMembers.length < 2)
      return toast.error("Please select at least 2 members");

    newGroup("Creating Group", {
      name: groupName.value,
      members: selectedMembers,
    });
    onClose();
  };

  const groupName = useInputValidation("");

  return (
    <Dialog open={isNewGroup} onClose={onClose}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={"25rem"}
        spacing={2}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.25rem", textAlign: "center" }}
        >
          New Group
        </DialogTitle>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#D1D1D1",
              },
              "&:hover fieldset": {
                borderColor: "#A1A1A1",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1E90FF",
              },
            },
          }}
        />
        <Typography sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Members
        </Typography>
        <Stack spacing={1}>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              bgcolor: "#F5F5F5",
              color: "#555",
              "&:hover": {
                bgcolor: "#E0E0E0",
              },
              padding: "0.75rem 1.5rem",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            }}
            onClick={onClose} // Close dialog on cancel
          >
            Cancel
          </Button>
          <Button
            sx={{
              bgcolor: "#1E90FF",
              color: "white",
              "&:hover": {
                bgcolor: "#1C86EE",
              },
              padding: "0.75rem 1.5rem",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            }}
            onClick={submitHandler}
            disabled={newGroupIsLoading}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
