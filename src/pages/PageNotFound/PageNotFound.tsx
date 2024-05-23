import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom v6

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Strona nie znaleziona
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 2, px: 4, py: 1.5 }}
      >
        Przejdź do strony głównej
      </Button>
    </Box>
  );
};

export default NotFoundPage;
