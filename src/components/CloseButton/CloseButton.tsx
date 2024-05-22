import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type CloseButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  right?: number | string;
  top?: number | string;
  sx?: object;
};
const CloseButton = ({
  onClick,
  right = 60,
  top = 32,
  sx,
}: CloseButtonProps) => {
  return (
    <IconButton
      aria-label="close"
      onClick={onClick}
      sx={{
        position: "absolute",
        right,
        top,
        color: (theme) => theme.palette.grey[500],
        ["@media (max-width:600px)"]: {
          right: 8,
          top: 22,
        },
        ...sx,
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
