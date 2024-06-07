import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  Typography,
  TextareaAutosize,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskInfoSidebarButtons from "../TaskInfoSidebarButtons/TaskInfoSidebarButtons";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../../styledComponents/SmallButton";
import StyledDescriptionField from "../../styledComponents/StyledDescriptionField";
import EditableText from "../EditableText/EditableText";
import { useTaskStore } from "../../store/TaskStore";
import CloseButton from "../CloseButton/CloseButton";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import * as Yup from "yup";
import { Member } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import { api } from "../../api/api";

type TaskInfoModalProps = {
  isOpen: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
  taskId?: string | null;
  mode: "add" | "edit";
  projectId: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

const taskValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, "Tytuł zadania musi zawierać co najmniej 1 znak.")
    .required("Tytuł zadania jest wymagany."),
  startDate: Yup.date()
    .nullable()
    .test(
      "is-valid-range",
      "Data rozpoczęcia musi być przed datą zakończenia.",
      function (value) {
        const { dueDate } = this.parent;
        return (
          value === null ||
          dueDate === null ||
          dayjs(value).isBefore(dayjs(dueDate))
        );
      }
    ),
  dueDate: Yup.date()
    .nullable()
    .test(
      "is-valid-range",
      "Data zakończenia musi być po dacie rozpoczęcia.",
      function (value) {
        const { startDate } = this.parent;
        return (
          value === null ||
          startDate === null ||
          dayjs(value).isAfter(dayjs(startDate))
        );
      }
    ),
});

function formatDate(date: dayjs.Dayjs | null) {
  if (!date) return null;
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format("YYYY-MM-DDTHH:mm:ss") : null;
}

const TaskInfoModal = ({
  isOpen,
  onClose,
  taskId,
  mode,
  projectId,
}: TaskInfoModalProps) => {
  const { addTask, updateTask, getTaskById } = useTaskStore();
  const task = getTaskById(taskId ?? "");
  const theme = useTheme();
  const { token } = useAuth();
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (mode === "edit" && task?.assignedMemberIds?.length) {
        setIsLoadingMembers(true);
        try {
          const response = await api.get(
            `${apiUrl}/user/by/ids/${task.assignedMemberIds.join(",")}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSelectedMembers(response.data);
        } catch (error) {
          console.error("Error fetching members:", error);
        } finally {
          setIsLoadingMembers(false);
        }
      } else if (mode === "add") {
        setSelectedMembers([]);
      }
    };

    if (isOpen) {
      fetchMembers();
    }
  }, [isOpen, task, token, mode]);

  const handleMemberSelect = (selectedMember: Member) => {
    const isAlreadySelected = selectedMembers.some(
      (member) => member.id === selectedMember.id
    );

    if (!isAlreadySelected) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        selectedMember,
      ]);
    } else {
      console.log("User is already added");
    }
  };

  const formik = useFormik({
    initialValues: {
      projectId: projectId,
      title: task?.title ?? "",
      description: task?.description ?? "",
      assignedMemberIds: task?.assignedMemberIds || [],
      startDate: task?.startDate ? dayjs(task.startDate) : null,
      dueDate: task?.dueDate ? dayjs(task.dueDate) : null,
      statusId: task?.statusId ?? "4b56b08b-0ffc-4abd-85a6-5f6a9c9a1a48",
      isCompleted: task?.isCompleted ?? false,
    },

    validationSchema: taskValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      const formattedStartDate = formatDate(values.startDate);
      const formattedDueDate = formatDate(values.dueDate);

      const filteredAssignedMemberIds = selectedMembers
        .map((member) => member.id)
        .filter((id): id is string => id !== undefined);

      const taskData = {
        ...task,
        projectId: projectId,
        title: values.title,
        description: values.description,
        assignedMemberIds: filteredAssignedMemberIds,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        statusId: task?.statusId ?? "4b56b08b-0ffc-4abd-85a6-5f6a9c9a1a48",
        isCompleted: task?.isCompleted ?? false,
      };

      if (mode === "edit" && task?.id) {
        await updateTask(task.id, taskData);
      } else {
        await addTask(taskData);
      }

      resetForm();
      setSubmitting(false);
      setLoading(false);
      onClose();
    },
    enableReinitialize: true,
  });

  const handleTaskInfoModalClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    formik.resetForm();
    onClose(event);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleTaskInfoModalClose}
      PaperProps={{
        sx: {
          height: "80vh",
          maxHeight: "80vh",
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            padding: 4,
            paddingTop: "16px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <EditableText
                text={formik.values.title}
                onTextChange={(newValue) =>
                  formik.setFieldValue("title", newValue)
                }
                placeholder="Wpisz nazwę zadania"
              />

              <CloseButton
                onClick={handleTaskInfoModalClose}
                right={20}
                top={20}
              />
            </Box>

            {formik.errors.title && formik.touched.title && (
              <Typography color="error" variant="caption">
                {formik.errors.title}
              </Typography>
            )}

            {isLoadingMembers ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            ) : (
              selectedMembers.length > 0 && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Członkowie</Typography>
                  <Box mt={4}>
                    <MembersAvatarsRow members={selectedMembers} />
                  </Box>
                </Stack>
              )
            )}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {formik.values.startDate && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Data rozpoczęcia</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pl"
                    >
                      <DateTimePicker
                        sx={{ width: "80%" }}
                        value={formik.values.startDate}
                        onChange={(newValue) =>
                          formik.setFieldValue("startDate", newValue)
                        }
                      />
                    </LocalizationProvider>
                  </Box>
                  {formik.errors.startDate && formik.touched.startDate && (
                    <Typography color="error" variant="caption">
                      {formik.errors.startDate}
                    </Typography>
                  )}
                </Stack>
              )}

              {formik.values.dueDate && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Data zakończenia</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // position: "relative",
                    }}
                  >
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pl"
                    >
                      <DateTimePicker
                        sx={{ width: "80%" }}
                        value={formik.values.dueDate}
                        onChange={(newValue) =>
                          formik.setFieldValue("dueDate", newValue)
                        }
                      />
                    </LocalizationProvider>
                  </Box>
                  {formik.errors.dueDate && formik.touched.dueDate && (
                    <Typography color="error" variant="caption">
                      {formik.errors.dueDate}
                    </Typography>
                  )}
                </Stack>
              )}
            </Box>

            <StyledDescriptionField
              fullWidth
              id="description"
              name="description"
              label={
                <Box display="flex" alignItems="center">
                  <FormatListBulletedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
                    Opis
                  </Typography>
                </Box>
              }
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              rows={4}
              placeholder="Dodaj bardziej szczegółowy opis..."
              variant="standard"
              InputProps={{
                disableUnderline: true,
                inputComponent: TextareaAutosize,
                inputProps: {
                  minRows: 3,
                  maxRows: 10,
                },
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  position: "absolute",
                  top: "-12px",
                },
              }}
              sx={{
                mt: 5,
              }}
            />
          </Box>

          <Box sx={{ flex: "0 1 auto", mt: 6 }}>
            <TaskInfoSidebarButtons
              onMemberSelect={handleMemberSelect}
              startDate={formik.values.startDate}
              dueDate={formik.values.dueDate}
              onStartDateChange={(newValue) =>
                formik.setFieldValue("startDate", newValue)
              }
              onDueDateChange={(newValue) =>
                formik.setFieldValue("dueDate", newValue)
              }
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
              projectId={projectId}
            />
          </Box>
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
            variant="contained"
            sx={{ backgroundColor: "#5E5F7D" }}
            onClick={handleTaskInfoModalClose}
          >
            Anuluj
          </SmallButton>
        </Box>
      </form>
    </Dialog>
  );
};

export default TaskInfoModal;
