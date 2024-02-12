import { Box, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TaskBoardNavigation = () => {
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
          to="/home"
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
          Moje zadania
        </Button>
        <Button
          component={Link}
          to="/tablica"
          sx={{
            borderRadius: "0 5px 5px 0",
            boxShadow: "none",
            backgroundColor: "#50557F",
            fontSize: "14px",
            fontWeight: "500",
            padding: "5px 40px",
            width: "200px",
            // "&:hover": {
            //   backgroundColor: "#50557F", // Keep the same color on hover
            // },
            textTransform: "none",
          }}
        >
          Tablica
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TaskBoardNavigation;
