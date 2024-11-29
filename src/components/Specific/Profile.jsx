import { Avatar, colors, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { transformImage } from "../../lib/Features";

const Profile = ({ confirm }) => {
  return (
    <Stack spacing={"2rem"} alignItems={"center"} direction={"column"}>
      <Avatar
        src={transformImage(confirm?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={confirm?.bio} />
      <ProfileCard
        heading={"Username"}
        text={confirm?.username}
        Icon={<FaceIcon sx={{ color: "#0f0f0f" }} />}
      />

      <ProfileCard
        heading={"Name"}
        text={confirm?.name}
        Icon={<UsernameIcon sx={{ color: "#0f0f0f" }} />}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment(confirm?.createdAt).fromNow()}
        Icon={<CalendarIcon sx={{ color: "#0f0f0f" }} />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      textAlign={"center"}
      color={"white"}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant="body1" color={"black"}>
          {text}
        </Typography>
        <Typography variant="caption" color={"gray"}>
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
