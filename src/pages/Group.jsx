import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialog/AddMemberDialog")
);

import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/Shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/SampleData";
import UserItem from "../components/Shared/UserItem";
import Header from "../components/Layout/Header";
import {
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useGetChatDetailsQuery,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { LayoutLoader } from "../components/Layout/Loaders";
import { populate } from "dotenv";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState();
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useGetChatDetailsQuery(
    {
      chat_id: chatId,
      populate: true,
    },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeGroupMember, isLoadingRemoveGroupMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    if (groupDetails?.data) {
      setGroupName(groupDetails?.data?.chat?.name);
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name);
      setMembers(groupDetails?.data?.chat?.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  useEffect(() => {
    if (chatId) {
      setGroupName(groupDetails?.data?.chat?.name);
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);
  const navigateBack = () => {
    navigate("/");
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const removeMemberHandler = (userId) => {
    removeGroupMember("Removing Member", { chatId, userId });
  };

  const confirmDeleteHandler = () => {
    setConfirmDelete(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group name", { chatId, name: groupNameUpdatedValue });
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "block" },
          height: "100vh",
          overflowY: "auto",
        }}
        sm={4}
      >
        <GroupList
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        ></GroupList>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: { xs: "1rem", sm: "1rem 3rem" },
          bgcolor: "#d8d8d8",
        }}
      >
        {/* Back Button */}
        <Tooltip title="Back" arrow>
          <IconButton
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              bgcolor: "rgba(0,0,0,0.8)",
              color: "white",
              ":hover": { bgcolor: "black" },
            }}
            onClick={navigateBack}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Tooltip>

        {/* Mobile Menu Button */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Box>

        {groupDetails?.data?.chat?.name && (
          <>
            {/* Group Name */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "45rem",
                bgcolor: "white",
                borderRadius: "1rem",
                p: "2rem",
                mb: "2rem",
                mt: { xs: "1rem", sm: "3rem" },
              }}
            >
              {isEdit ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TextField
                    value={groupNameUpdatedValue}
                    onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <IconButton
                    onClick={updateGroupName}
                    disabled={isLoadingGroupName}
                  >
                    <DoneIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4">{groupName}</Typography>
                  <IconButton
                    onClick={() => setIsEdit(true)}
                    disabled={isLoadingGroupName}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              )}
            </Box>

            {/* Members */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "45rem",
                bgcolor: "white",
                borderRadius: "1rem",
                p: "2rem",
                mb: "2rem",
                height: "50vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="body1" sx={{ color: "#333", mb: "1rem" }}>
                Members
              </Typography>
              <Stack spacing={2}>
                {isLoadingRemoveGroupMember ? (
                  <Skeleton />
                ) : (
                  members.map((user) => (
                    <UserItem
                      user={user}
                      isAdded
                      key={user._id}
                      styling={{
                        boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                        p: "1rem 2rem",
                        borderRadius: "1rem",
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
                )}
              </Stack>
            </Box>

            {/* Buttons */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "45rem",
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Button
                size="large"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={confirmDeleteHandler}
                sx={{
                  bgcolor: "#ff5252",
                  ":hover": {
                    bgcolor: "#ff1744",
                  },
                }}
              >
                DELETE GROUP
              </Button>
              <Button
                size="large"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openAddMemberHandler}
                sx={{
                  bgcolor: "#007bff",
                  ":hover": {
                    bgcolor: "#0069d9",
                  },
                }}
              >
                ADD MEMBER
              </Button>
            </Box>
          </>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <GroupList
            w="70vw"
            myGroups={myGroups?.data?.groups}
            chatId={chatId}
          ></GroupList>
        </Drawer>
      </Grid>

      {/* Dialogs */}
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDelete && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDelete}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w}>
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <Link
            key={group._id}
            to={`?group=${group._id}`}
            onClick={(e) => {
              if (chatId === group._id) e.preventDefault();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              p: "1rem",
              borderRadius: "0",
              bgcolor: chatId === group._id ? "#d8d8d8" : "#f0f0f0",
              color: "#333",
              ":hover": {
                bgcolor: "#e5e7eb",
              },
            }}
          >
            <AvatarCard avatar={group.avatar} />
            <Typography ml={2} fontWeight="bold" variant="body1">
              {group.name}
            </Typography>
          </Link>
        ))
      ) : (
        <Typography variant="body1" textAlign="center">
          No groups found
        </Typography>
      )}
    </Stack>
  );
};

export default memo(Group);
