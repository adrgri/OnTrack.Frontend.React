import React, { useRef } from "react";
import { Typography, IconButton, Grid, Box } from "@mui/material";
import PopupLayout from "../../layout/PopupLayout";
import SmallButton from "../../../styledComponents/SmallButton";

import SearchIcon from "../../../assets/icons/IconsIcons/SearchIcon.svg";
import HomeIcon from "../../../assets/icons/IconsIcons/HomeIcon.svg";
import SettingsIcon from "../../../assets/icons/IconsIcons/SettingsIcon.svg";
import GlobeIcon from "../../../assets/icons/IconsIcons/GlobeIcon.svg";
import HeartIcon from "../../../assets/icons/IconsIcons/HeartIcon.svg";
import AlarmIcon from "../../../assets/icons/IconsIcons/AlarmIcon.svg";
import SensorFireIcon from "../../../assets/icons/IconsIcons/SensorFireIcon.svg";
import PeopleIcon from "../../../assets/icons/IconsIcons/PeopleIcon.svg";
import { IconSelection } from "../../../types";

interface IconsModalProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  selectedIcon: IconSelection | null;
  onIconSelect: (icon: IconSelection | null) => void;
}

const IconsModal: React.FC<IconsModalProps> = ({
  open,
  anchorEl,
  onClose,
  selectedIcon,
  onIconSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const iconData = [
    { iconName: "search", imageUrl: SearchIcon },
    { iconName: "home", imageUrl: HomeIcon },
    { iconName: "settings", imageUrl: SettingsIcon },
    { iconName: "globe", imageUrl: GlobeIcon },
    { iconName: "heart", imageUrl: HeartIcon },
    { iconName: "alarm", imageUrl: AlarmIcon },
    { iconName: "sensorfire", imageUrl: SensorFireIcon },
    { iconName: "people", imageUrl: PeopleIcon },
  ];

  const handleIconSelect = (icon: IconSelection) => {
    onIconSelect(icon);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onIconSelect({ iconName: file.name, imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    if (selectedIcon) {
      onClose();
    }
  };

  return (
    <PopupLayout
      title="Ikonki"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <Box sx={{ bgcolor: "#F5F5F5", p: 1, mt: 1, borderRadius: "8px" }}>
        <Grid container sx={{ justifyContent: "center" }}>
          {iconData.map((icon) => (
            <Grid item key={icon.iconName}>
              <IconButton
                onClick={() => handleIconSelect(icon)}
                color={
                  selectedIcon?.iconName === icon.iconName
                    ? "primary"
                    : "default"
                }
              >
                <img
                  src={icon.imageUrl}
                  alt={icon.iconName}
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography
        variant="body2"
        sx={{
          cursor: "pointer",
          textAlign: "right",
          mt: 2,
          color: "#5E5F7D",
          display: "block",
          width: "100%",
        }}
        onClick={handleUploadClick}
      >
        Załaduj własną
      </Typography>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".svg, .png, .jpg, .jpeg, .pdf"
        style={{ display: "none" }}
      />

      <SmallButton variant="contained" onClick={handleAddClick}>
        Dodaj
      </SmallButton>
    </PopupLayout>
  );
};

export default IconsModal;
