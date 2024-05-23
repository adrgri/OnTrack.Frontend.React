import { Grid, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import EditIcon from "../../assets/icons/EditIcon.svg";
import { MouseEventHandler, ReactNode } from "react";

interface ActionButtonsProps {
  children: ReactNode;
  handleAdd: MouseEventHandler;
  handleEditAll: MouseEventHandler;
  showAddButton?: boolean;
}

function ActionButtons({
  children,
  handleEditAll,
  handleAdd,
  showAddButton = true,
}: ActionButtonsProps) {
  return (
    <Grid item>
      <Grid container spacing={3}>
        <Grid item>
          <Button
            startIcon={<img src={EditIcon} alt="Edytuj" />}
            variant="contained"
            sx={{
              padding: "5px 20px",
              fontSize: "14px",
              zIndex: 2,
              borderRadius: "5px",
              backgroundColor: "#50557F",
            }}
            onClick={handleEditAll}
          >
            Edytuj
          </Button>
        </Grid>

        {showAddButton && (
          <Grid item>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                padding: "5px 20px",
                fontSize: "14px",
                zIndex: 2,
                borderRadius: "5px",
              }}
              onClick={handleAdd}
            >
              {children}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default ActionButtons;
