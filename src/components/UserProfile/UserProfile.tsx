import React, { useState } from "react";
import { Typography, Avatar, Box, Badge } from "@mui/material";
import { UserProfileProps } from "../../types";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const emptyAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const UserProfile = ({ name, avatar: initialAvatar }: UserProfileProps) => {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the avatar state to the base64 image string or null if reader.result is null
        setAvatar(reader.result as string);
        setAvatarFile(file); // Keep the file reference for uploading
        uploadAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`localhost:3001/avatars`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Avatar uploaded successfully", result);
    } catch (error) {
      console.error("Error uploading avatar", error);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        accept="image/*"
        type="file"
        id="avatar-upload"
        style={{ display: "none" }}
        onChange={handleAvatarChange}
      />
      <label htmlFor="avatar-upload">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <PhotoCameraIcon
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "2px",
                width: 24,
                height: 24,
                cursor: "pointer",
                boxShadow: 3,
              }}
            />
          }
        >
          <Avatar
            src={avatar ?? emptyAvatar}
            sx={{ width: 56, height: 56, m: 1, cursor: "pointer" }}
            alt={`${name}'s avatar`}
          />
        </Badge>
      </label>
      <Typography variant="subtitle1">{name}</Typography>
    </Box>
  );
};

export default UserProfile;
