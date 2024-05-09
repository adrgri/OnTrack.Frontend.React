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
import { useFormik } from "formik";
import { Project } from "../../types";
import { useProjectStore } from "../../store/ProjectStore";

interface ProjectFormProps {
  isOpen: boolean;
  handleClose: () => void;
  project?: Project; // May be undefined for 'add' mode
  mode: "add" | "edit";
}

function ProjectForm({ isOpen, handleClose, project, mode }: ProjectFormProps) {
  const { addProject, updateProject } = useProjectStore();

  const formik = useFormik({
    initialValues: {
      name: project?.name || "",
      description: project?.description || "",
      members: project?.members?.join(", ") || "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const newProjectData = {
        ...project,
        name: values.name,
        description: values.description,
        members: values.members.split(",").map((member) => member.trim()),
      };

      try {
        if (mode === "add") {
          await addProject(newProjectData);
        } else if (mode === "edit" && project?.id) {
          await updateProject(project.id, newProjectData);
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting the project:", error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });
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

      <form onSubmit={formik.handleSubmit}>
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
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Wpisz nazwe projektu"
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
            name="members"
            value={formik.values.members}
            onChange={formik.handleChange}
            placeholder="Wyszukaj członków"
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
          >
            Zapisz
          </SmallButton>
          <SmallButton
            type="button"
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
