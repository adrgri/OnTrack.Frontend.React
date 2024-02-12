import React from "react";
import { Popover, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PopupLayoutProps {
  title: string;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupLayout: React.FC<PopupLayoutProps> = ({
  title,
  open,
  anchorEl,
  onClose,
  children,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        sx={{
          width: 350,
          bgcolor: "background.paper",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#5e5b5b",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "center",
            width: "100%",
          }}
        >
          {title}
        </Typography>

        <IconButton
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {children}
      </Box>
    </Popover>
  );
};

export default PopupLayout;
