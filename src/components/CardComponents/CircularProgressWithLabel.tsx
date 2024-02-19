import {
  Box,
  CircularProgress,
  Typography,
  CircularProgressProps,
} from "@mui/material";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
  size?: number | string;
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
  size = 100,
  ...otherProps
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Background circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        sx={{
          color: "#5E5F7D",
          ...otherProps.sx,
        }}
      />
      {/* Progress circle */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        sx={{
          position: "absolute",
          left: 0,
          ...otherProps.sx,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="primary.main"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
