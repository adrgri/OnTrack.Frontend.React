import { Typography, Avatar, Box } from "@mui/material";
import { UserProfileProps } from "../../types";

const UserProfile = ({ name, avatar }: UserProfileProps) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar src={avatar} sx={{ width: 56, height: 56, m: 1 }} />
      <Typography variant="subtitle1">{name}</Typography>
    </Box>
  );
};

export default UserProfile;
