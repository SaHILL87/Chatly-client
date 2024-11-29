import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import UserItem from "../Shared/UserItem";

const Search = ({ open, onClose }) => {
  const search = useInputValidation("");
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const [users, setusers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request", { userId: id });
  };

  useEffect(() => {
    if (search.value === "") return setusers([]);
    const timeout = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setusers(data.users))
        .catch((err) => console.log(err));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search.value]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Stack
        p={"2rem"}
        spacing={2}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <DialogTitle
          textAlign={"center"}
          sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
        >
          Find People
        </DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
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
            },
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={false}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
