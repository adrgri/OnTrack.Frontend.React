import React from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface BoardNavigationProps {
  leftButtonLabel: string;
  rightButtonLabel: string;
  leftButtonLink: string;
  rightButtonLink: string;
}

const BoardNavigation: React.FC<BoardNavigationProps> = ({
  leftButtonLabel,
  rightButtonLabel,
  leftButtonLink,
  rightButtonLink,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        mb: 3,
        gap: 7,
        pt: 5,
      }}
    >
      <ButtonGroup
        variant="contained"
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          ".MuiButton-root": { flex: 1 },
        }}
      >
        <Button
          component={Link}
          to={leftButtonLink}
          sx={{
            borderRadius: "5px 0 0 5px",
            boxShadow: "none",
            fontSize: "14px",
            fontWeight: "500",
            padding: "5px 40px",
            width: "150px",
            textTransform: "none",
          }}
        >
          {leftButtonLabel}
        </Button>
        <Button
          component={Link}
          to={rightButtonLink}
          sx={{
            borderRadius: "0 5px 5px 0",
            boxShadow: "none",
            backgroundColor: "#50557F",
            fontSize: "14px",
            fontWeight: "500",
            padding: "5px 40px",
            width: "200px",
            textTransform: "none",
          }}
        >
          {rightButtonLabel}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default BoardNavigation;
