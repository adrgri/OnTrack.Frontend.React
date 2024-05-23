import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type NoContentProps = {
  type: "project" | "task";
  navigateTo?: string; // Optional prop for navigation
};

const NoContent = ({ type, navigateTo }: NoContentProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

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
        Jeszcze nie masz {type === "project" ? "projektów" : "zadań"}.
      </Typography>
      {!navigateTo && (
        <Typography variant="body1" gutterBottom>
          Naciśnij przycisk{" "}
          <span style={{ fontWeight: "bold" }}>
            + {type === "project" ? "Projekt" : "Zadanie"}
          </span>
          , aby stworzyć{" "}
          {type === "project" ? "swój pierwszy" : "swoje pierwsze"}{" "}
          {type === "project" ? "projekt" : "zadanie"}.
        </Typography>
      )}
      {navigateTo && (
        <>
          <Typography variant="body1" gutterBottom>
            Stwórz swój pierwszy projekt lub dodaj zadania do już istniejącego.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigate}
            sx={{ mt: 2, px: 4, py: 1.5 }}
          >
            Przejdź do Projektów
          </Button>
        </>
      )}
    </Box>
  );
};

export default NoContent;
