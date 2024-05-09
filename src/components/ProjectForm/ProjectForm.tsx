import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import CloseButton from "../CloseButton/CloseButton";
import SmallButton from "../../styledComponents/SmallButton";
import StyledSidebarModalInput from "../../styledComponents/StyledSidebarModalInput";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProjectFormProps {
  isOpen: boolean;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  project?: Project; // May be undefined for 'add' mode
  mode: "add" | "edit";
}

function ProjectForm({ isOpen, handleClose, project, mode }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (mode === "edit" && project) {
      setName(project.name);
      setDescription(project.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [project, mode]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const projectData = { name, description };
    console.log(`${mode === "add" ? "Dodaj" : "Edytuj"} projekt:`, projectData);
    handleClose(event);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          overflowY: "auto",
          maxWidth: "500px",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "17px",
          color: "#5F5B5B",
          mt: 2,
        }}
      >
        {mode === "add" ? "Dodaj projekt" : "Edytuj projekt"}
      </DialogTitle>
      <CloseButton onClick={handleClose} right={20} top={20} />

      <form>
        <DialogContent sx={{ paddingBottom: 12 }}>
          <Typography
            variant="body1"
            sx={{ color: "#5F5B5B", fontWeight: 600 }}
          >
            Nazwa projektu
          </Typography>
          <StyledSidebarModalInput
            fullWidth
            variant="filled"
            // value={task.text}
            // onChange={(e) => handleInputChange(task.id, e.target.value)}
            placeholder="Wpisz nazwe projektu"
            // onKeyPress={(e) => handleKeyPress(e, task)}
            sx={{ width: 300 }}
          />
          <Typography
            mt={2}
            variant="body1"
            sx={{ color: "#5F5B5B", fontWeight: 600 }}
          >
            Członkowie
          </Typography>
          <StyledSidebarModalInput
            fullWidth
            variant="filled"
            // value={task.text}
            // onChange={(e) => handleInputChange(task.id, e.target.value)}
            placeholder="Wyszukaj członków"
            // onKeyPress={(e) => handleKeyPress(e, task)}
            sx={{ width: 300 }}
            endAdornment={
              <InputAdornment position="end">
                <img src={SearchIcon} alt="search" />
              </InputAdornment>
            }
          />
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            position: "absolute",
            bottom: 36,
            right: 26,
          }}
        >
          <SmallButton
            type="submit"
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={handleSubmit}
          >
            Zapisz
          </SmallButton>
          <SmallButton
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#5E5F7D" }}
            onClick={handleClose}
          >
            Anuluj
          </SmallButton>
        </Box>
      </form>
    </Dialog>
  );
}

export default ProjectForm;
