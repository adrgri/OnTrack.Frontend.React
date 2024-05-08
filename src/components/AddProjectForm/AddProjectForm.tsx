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

interface AddProjectFormProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
}

function AddProjectForm({ isOpen, handleClose, title }: AddProjectFormProps) {
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
        {title}
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
            onClick={handleClose}
          >
            Zapisz
          </SmallButton>
          <SmallButton
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#5E5F7D" }}
            // onClick={onCancel}
          >
            Anuluj
          </SmallButton>
        </Box>
      </form>
    </Dialog>
  );
}

export default AddProjectForm;
