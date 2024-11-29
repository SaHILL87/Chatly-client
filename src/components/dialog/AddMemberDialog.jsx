import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/SampleData";
import UserItem from "../Shared/UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";
const AddMemberDialog = ({ chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, isError, error, data } = useAvailableFriendsQuery(chatId);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const [addMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMemberMutation
  );

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMember("Adding Member", { chatId, members: selectedMembers });
    closeHandler();
  };

  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
    dispatch(setIsAddMember(false));
  };

  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      PaperProps={{
        sx: {
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack spacing={"1rem"} width={"20rem"} p={"2rem"}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Add Member
        </DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={"1rem"}
        >
          <Button
            size="small"
            variant="contained"
            onClick={closeHandler}
            sx={{
              borderRadius: "0.5rem",
              bgcolor: "#d8d8d8",
              ":hover": { bgcolor: "#c0c0c0" },
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={isLoadingAddMember}
            onClick={addMemberSubmitHandler}
            sx={{
              borderRadius: "0.5rem",
              bgcolor: "#0056b3",
              ":hover": { bgcolor: "#004494" },
            }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
