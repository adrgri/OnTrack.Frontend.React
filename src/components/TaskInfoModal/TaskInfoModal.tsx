import { useEffect, useState } from "react";
import { useFormik } from "formik";

import {
  Dialog,
  DialogContent,
  Typography,
  TextareaAutosize,
  Box,
  Stack,
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
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import { UsersList } from "../../types";

type TaskInfoModelProps = {
  isOpen: boolean;
  handleClose: () => void;
  onCancel: () => void;
  taskId?: string | null;
};

const taskValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, "Task title must contain at least 1 character.")
    .required("Task title is required."),
});

const TaskInfoModel = ({
  isOpen,
  handleClose,
  onCancel,
  taskId,
}: TaskInfoModelProps) => {
  const task = useTaskStore((state) => state.getTaskById(taskId ?? ""));

  const [selectedMembers, setSelectedMembers] = useState<UsersList[]>([]);
  const { addTask, updateTask } = useTaskStore();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    task ? dayjs(task.startDate) : null
  );
  const [dueDate, setdueDate] = useState<dayjs.Dayjs | null>(
    task ? dayjs(task.dueDate) : null
  );

  const handleMemberSelect = (selectedMember: UsersList) => {
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

  const isEditMode = !!taskId;

  useEffect(() => {
    if (task) {
      setStartDate(task.startDate ? dayjs(task.startDate) : null);
      setdueDate(task.dueDate ? dayjs(task.dueDate) : null);
      setSelectedMembers(task.assignedMemberIds ?? []);
    } else {
      setStartDate(null);
      setdueDate(null);
      setSelectedMembers([]);
    }
  }, [task]);

  const formik = useFormik({
    initialValues: {
      projectId: task?.projectId ?? "cea9bf77-c59f-4882-a3d1-c94525d8beca",
      title: task?.title ?? "",
      description: task?.description ?? "",
      assignedMemberIds: task?.assignedMemberIds || [
        "04c662ad-366c-418e-8119-35ec53d68305",
      ],
      startDate: task?.startDate ? dayjs(task.startDate) : null,
      dueDate: task?.dueDate ? dayjs(task.dueDate) : null,
      statusId: task?.statusId ?? "f75fd79b-8ed2-4533-8d08-306aeee7fccb",
      isCompleted: task?.isCompleted ?? false,
    },

    validationSchema: taskValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const taskData = {
        ...task,
        projectId: task?.projectId ?? "cea9bf77-c59f-4882-a3d1-c94525d8beca",
        title: values.title,
        description: values.description,
        assignedMemberIds: ["04c662ad-366c-418e-8119-35ec53d68305"],
        startDate: values.startDate
          ? dayjs(values.startDate).toISOString()
          : null,
        dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : null,
        statusId: task?.statusId ?? "f75fd79b-8ed2-4533-8d08-306aeee7fccb",
        isCompleted: task?.isCompleted ?? false,
      };

      if (isEditMode && task?.id) {
        updateTask(task.id, taskData);
      } else {
        addTask(taskData);
      }

      resetForm();
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const theme = useTheme();

  useEffect(() => {
    console.log("Selected task from useEffect:", task);
  }, [task]);

  console.log("Selected task:", task);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
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
                placeholder="Wpisz nazwe zadania"
              />

              <CloseButton onClick={handleClose} right={20} top={20} />
            </Box>

            {selectedMembers.length > 0 && (
              <Stack spacing={2}>
                <Typography variant="subtitle1">Członkowie</Typography>
                <MembersAvatarsRow members={selectedMembers ?? []} />
              </Stack>
            )}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {startDate && (
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
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>
              )}

              {dueDate && (
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
                        value={dueDate}
                        onChange={(newValue) => setdueDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Box>
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
              startDate={startDate}
              dueDate={dueDate}
              onStartDateChange={setStartDate}
              ondueDateChange={setdueDate}
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
            onClick={handleClose}
          >
            Zapisz
          </SmallButton>
          <SmallButton
            variant="contained"
            sx={{ backgroundColor: "#5E5F7D" }}
            onClick={onCancel}
          >
            Anuluj
          </SmallButton>
        </Box>
      </form>
    </Dialog>
  );
};

export default TaskInfoModel;
