import React from "react";
import { Box, Typography, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1, 1),
  marginTop: theme.spacing(2),
  borderRadius: "5px",
  cursor: "pointer",
}));

type CustomInputFieldProps = {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showIcon: boolean;
};

const StyledSidedbarModalBox = ({
  onClick,
  children,
  icon,
  showIcon,
}: CustomInputFieldProps) => {
  return (
    <StyledBox onClick={onClick}>
      <Typography variant="body1" sx={{ flexGrow: 1, color: "#5F5B5B" }}>
        {children}
      </Typography>
      {showIcon && icon}
    </StyledBox>
  );
};

export default StyledSidedbarModalBox;
