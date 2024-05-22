import { Avatar, Box } from "@mui/material";
import { UserProfileProps } from "../../types";

// const emptyAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const UserProfile = ({ name, avatar: initialAvatar }: UserProfileProps) => {
  const avatar = initialAvatar;
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar
        src={avatar}
        sx={{ width: 56, height: 56, m: 1 }}
        alt={`${name}'s avatar`}
      >
        {firstLetter}
      </Avatar>
    </Box>
  );
};

export default UserProfile;
