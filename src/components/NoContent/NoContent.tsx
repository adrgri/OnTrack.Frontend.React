import { Box, Typography } from "@mui/material";

type NoContentProps = {
  type: "project" | "task";
};

const NoContent = ({ type }: NoContentProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 250px)"
      textAlign="center"
    >
      <Typography variant="h5" gutterBottom>
        Jeszcze nie masz {type === "project" ? "projektów" : "zadań"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Naciśnij przycisk{" "}
        <span style={{ fontWeight: "bold" }}>
          + {type === "project" ? "Projekt" : "Zadanie"}
        </span>
        , aby stworzyć swój pierwszy{" "}
        {type === "project" ? "projekt" : "zadanie"}
      </Typography>
    </Box>
  );
};

export default NoContent;
