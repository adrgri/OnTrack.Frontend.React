import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseButton from "../CloseButton/CloseButton";
import SmallButton from "../../styledComponents/SmallButton";
import StyledSidebarModalInput from "../../styledComponents/StyledSidebarModalInput";
import { useFormik } from "formik";
import { Member, Project } from "../../types";
import { useProjectStore } from "../../store/ProjectStore";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useMemberSearch } from "../../hooks/useMemberSearch";

interface ProjectFormModalProps {
  isOpen: boolean;
  handleClose: () => void;
  project?: Project; // May be undefined for 'add' mode
  mode: "add" | "edit";
}

const apiUrl = import.meta.env.VITE_API_URL;

const projectValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, "Tytuł projektu musi zawierać co najmniej 1 znak.")
    .required("Tytuł projektu jest wymagany."),
});

function ProjectFormModal({
  isOpen,
  handleClose,
  project,
  mode,
}: ProjectFormModalProps) {
  const { addProject, updateProject } = useProjectStore();
  const { user, token } = useAuth();
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isLoadingSelectedMembers, setIsLoadingSelectedMembers] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const {
    searchMemberRef,
    members,
    isLoadingMembers,
    handleSearchChange,
    clearSearchInput,
  } = useMemberSearch(true, selectedMembers);

  useEffect(() => {
    const initializeMembers = async () => {
      setIsLoadingSelectedMembers(true);
      if (mode === "edit" && project?.memberIds?.length) {
        try {
          const response = await axios.get(
            `${apiUrl}/user/by/ids/${project.memberIds.join(",")}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSelectedMembers(response.data);
        } catch (error) {
          console.error("Error fetching project members:", error);
        }
      } else {
        setSelectedMembers([]);
      }
      setIsLoadingSelectedMembers(false);
    };

    if (isOpen) {
      initializeMembers();
    }
  }, [isOpen, mode, project, token]);

  const onMemberSelect = (member: Member) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      const updatedMembers = [...selectedMembers, member];
      setSelectedMembers(updatedMembers);
      formik.setFieldValue(
        "memberIds",
        updatedMembers.map((m) => m.id)
      );
      clearSearchInput();
    }
  };

  const onMemberRemove = (memberId: string) => {
    if (selectedMembers.length === 1) {
      setWarningMessage("Projekt musi mieć co najmniej jednego członka.");
      return;
    }
    const updatedMembers = selectedMembers.filter((m) => m.id !== memberId);
    setSelectedMembers(updatedMembers);
    formik.setFieldValue(
      "memberIds",
      updatedMembers.map((m) => m.id)
    );
  };

  const formik = useFormik({
    initialValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      memberIds: mode === "edit" ? selectedMembers.map((m) => m.id) : [],
    },
    validationSchema: projectValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      const newProjectData = {
        ...project,
        title: values.title,
        description: values.description,
        memberIds: values.memberIds,
      };

      try {
        if (mode === "add") {
          await addProject({
            ...newProjectData,
            memberIds: selectedMembers
              .filter((m) => m.id !== undefined)
              .map((m) => m.id!),
          });
        } else if (mode === "edit" && project?.id) {
          await updateProject(project.id, {
            ...newProjectData,
            memberIds: selectedMembers
              .filter((m) => m.id !== undefined)
              .map((m) => m.id!),
          });
        }
        resetForm();
        clearSearchInput();
        setSelectedMembers([]);
        setWarningMessage(null);
        handleClose();
      } catch (error) {
        console.error("Error submitting the project:", error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  const handleDialogClose = () => {
    formik.resetForm();
    clearSearchInput();
    setSelectedMembers([]);
    setWarningMessage(null);
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleDialogClose}
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
      <CloseButton onClick={handleDialogClose} right={20} top={20} />

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
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Wpisz nazwę projektu"
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
          {formik.touched.title && formik.errors.title ? (
            <Typography color="error" variant="caption">
              {formik.errors.title}
            </Typography>
          ) : null}
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
            placeholder="Wyszukaj członków"
            sx={{ width: { xs: "100%", sm: 300 } }}
            inputRef={searchMemberRef}
            onChange={handleSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />

          {searchMemberRef.current?.value &&
            members.length === 0 &&
            !isLoadingMembers && (
              <Typography color="textSecondary" variant="body2">
                Brak wyników
              </Typography>
            )}

          {searchMemberRef.current?.value && isLoadingMembers && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          )}

          {!searchMemberRef.current?.value && isLoadingMembers && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          )}

          {!isLoadingMembers && (
            <>
              {searchMemberRef.current?.value &&
                members.map((member) => (
                  <Box
                    key={member.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 2,
                      borderRadius: "5px",
                      transition: "background-color 0.4s ease-in-out",
                      ":hover": {
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                    onClick={() => onMemberSelect(member)}
                  >
                    <Avatar alt={`${member.firstName} ${member.lastName}`} />
                    <Typography>
                      {member.firstName} {member.lastName}
                    </Typography>
                  </Box>
                ))}

              {isLoadingSelectedMembers ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  mt={4}
                  sx={{
                    maxHeight: selectedMembers.length > 2 ? "100px" : "auto",
                    overflowY:
                      selectedMembers.length > 2 ? "scroll" : "visible",
                  }}
                >
                  {selectedMembers.map((member) => (
                    <Box
                      key={member.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 1,
                      }}
                    >
                      <Avatar alt={`${member.firstName} ${member.lastName}`} />
                      <Typography>
                        {member.firstName} {member.lastName}
                      </Typography>
                      {member.id !== user?.id && (
                        <IconButton
                          onClick={() => onMemberRemove(member.id ?? "")}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}

          {warningMessage && (
            <Typography color="error" variant="caption">
              {warningMessage}
            </Typography>
          )}
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
            disabled={loading}
          >
            {loading ? "Zapisywanie..." : "Zapisz"}
          </SmallButton>
          <SmallButton
            type="button"
            variant="contained"
            sx={{ backgroundColor: "#5E5F7D" }}
            onClick={handleDialogClose}
          >
            Anuluj
          </SmallButton>
        </Box>
      </form>
    </Dialog>
  );
}

export default ProjectFormModal;
