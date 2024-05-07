import { useEffect, useState } from "react";
import { useFormik } from "formik";

import {
  Dialog,
  DialogContent,
  Typography,
  TextareaAutosize,
  Box,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import AddTaskSidebarButtons from "../AddTaskSidebarButtons/AddTaskSidebarButtons";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../../styledComponents/SmallButton";
import StyledDescriptionField from "../../styledComponents/StyledDescriptionField";

import { TaskListItem, Resource, User, Icon, Attachment } from "../../types";

import EditableText from "../EditableText/EditableText";
import AttachmentIcon from "../../assets/icons/TaskIcons/AttachmentIcon.svg";
import { useTaskStore } from "../../store/TaskStore";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import CloseButton from "../CloseButton/CloseButton";

import dayjs from "dayjs";
import "dayjs/locale/pl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import * as Yup from "yup";
import { toast } from "react-toastify";
import MembersAvatarsRow from "../CardComponents/MembersAvatarsRow";
import EntityIcon from "../CardComponents/EntityIcon";

type AddTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  taskId?: string | null;
};

const taskValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, "Task name must contain at least 1 character.")
    .required("Task name is required."),
});

const AddTaskModal = ({ isOpen, handleClose, taskId }: AddTaskModalProps) => {
  const task = useTaskStore((state) => state.getTaskById(taskId ?? ""));

  const [tasksList, setTasksList] = useState<TaskListItem[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<Icon>();
  const [attachments, setAttachments] = useState<Attachment[]>();
  const { addTask, updateTask, deleteTask } = useTaskStore();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    task ? dayjs(task.startDate) : null
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    task ? dayjs(task.endDate) : null
  );

  const handleAttachmentSelect = (newAttachments: Attachment[]) => {
    setAttachments((prevAttachments) => [
      ...(prevAttachments ?? []),
      ...newAttachments,
    ]);
  };

  const handleIconSelect = (icon: Icon) => {
    setSelectedIcon(icon);
  };

  const handleMemberSelect = (selectedMember: User) => {
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

  const handleAddResource = (newResource: Resource) => {
    setResources([...resources, newResource]);
  };

  useEffect(() => {
    if (task) {
      setStartDate(task.startDate ? dayjs(task.startDate) : null);
      setEndDate(task.endDate ? dayjs(task.endDate) : null);
      setSelectedIcon(task.icon ?? undefined);
      setSelectedMembers(task.members ?? []);
      setTasksList(task.taskList ?? []);
      setResources(task.resources ?? []);
      setAttachments(task.attachments ?? []);
    } else {
      setStartDate(null);
      setEndDate(null);
      setSelectedIcon(undefined);
      setTasksList([]);
      setResources([]);
      setSelectedMembers([]);
      setAttachments([]);
    }
  }, [task, isOpen]);

  const formik = useFormik({
    initialValues: {
      name: task?.name ?? "",
      description: task?.description ?? "",
      members: task?.members ?? [],
      startDate: task?.startDate ?? null,
      endDate: task?.endDate ?? null,
      icon: task?.icon ?? null,
      attachments: task?.attachments ?? [],
      taskList: task?.taskList ?? [],
      resources: task?.resources ?? [],
    },

    validationSchema: taskValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { name } = values;
      if (!name.trim()) {
        toast.error("Task name is required.");
        resetForm();
        setSubmitting(false);
        return;
      }

      const taskData = {
        id: task?.id ?? "",
        name: values.name,
        description: values.description,
        members: selectedMembers,
        startDate: startDate ? dayjs(startDate).toISOString() : null,
        endDate: endDate ? dayjs(endDate).toISOString() : null,
        icon: selectedIcon,
        attachments: attachments ?? [],
        taskList: tasksList,
        resources: resources,
        status: task ? task.status : "todo",
      };

      if (task?.id) {
        updateTask(task.id, taskData)
          .then(() => {
            toast.success("Task updated successfully!");
            handleClose();
          })
          .catch((error) => toast.error(`Update failed: ${error.message}`));
      } else {
        addTask(taskData)
          .then(() => {
            toast.success("Task added successfully!");
            handleClose();
          })
          .catch((error) => toast.error(`Add failed: ${error.message}`));
      }

      resetForm();
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const theme = useTheme();

  const addTaskList = (taskText: string) => {
    setTasksList((currentTasks: TaskListItem[]) => [
      ...currentTasks,
      { id: Date.now().toString(), text: taskText, isChecked: false },
    ]);
  };

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const onDelete = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (task?.id) {
      deleteTask(task.id)
        .then(() => {
          console.log("Task deleted successfully");
          setIsConfirmDeleteModalOpen(false);
          handleClose();
        })
        .catch((error) => {
          console.error("Failed to delete task:", error);
        });
    }
  };

  useEffect(() => {
    return () => {
      if (attachments !== undefined) {
        attachments.forEach((attachment) => {
          if (attachment.url) {
            URL.revokeObjectURL(attachment.url);
          }
        });
      }
    };
  }, [attachments]);

  useEffect(() => {
    console.log("Selected task from useEffect:", task);
  }, [task]);

  useEffect(() => {
    console.log("Selected icon from useEffect:", selectedIcon);
  }, [selectedIcon]);

  return (
    <>
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
                  text={formik.values.name}
                  onTextChange={(newValue) =>
                    formik.setFieldValue("name", newValue)
                  }
                  placeholder="Wpisz nazwe zadania"
                />

                <EntityIcon
                  icon={selectedIcon}
                  style={{ width: "20px", height: "20px" }}
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
                    <Typography variant="subtitle1">
                      Data rozpoczęcia
                    </Typography>
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

                {endDate && (
                  <Stack spacing={2}>
                    <Typography variant="subtitle1">
                      Data zakończenia
                    </Typography>
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
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Stack>
                )}
              </Box>

              {attachments && attachments.length > 0 && (
                <>
                  <Typography variant="subtitle1">Załączniki</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    {attachments.map((file, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img
                          src={AttachmentIcon}
                          alt="Attachment"
                          style={{ width: 24, height: 24 }}
                        />
                        <Typography>
                          <a
                            href={
                              file.url ? file.url : URL.createObjectURL(file)
                            }
                            download={file.name}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {file.name}
                          </a>
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

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

              {tasksList.length > 0 && (
                <Typography variant="subtitle1">Lista zadań</Typography>
              )}

              {tasksList.map((task, index) => (
                <Box key={task.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.isChecked}
                        onChange={(e) => {
                          const newTasksList = tasksList.map(
                            (item, itemIndex) =>
                              index === itemIndex
                                ? { ...item, isChecked: e.target.checked }
                                : item
                          );
                          setTasksList(newTasksList);
                        }}
                      />
                    }
                    label={task.text}
                  />
                </Box>
              ))}

              {resources.length > 0 && (
                <Typography variant="subtitle1">Zasoby</Typography>
              )}
              {resources.map((res, index) => (
                <div key={index}>
                  {res.resourceName} {res.quantity}
                  {res.unit}
                </div>
              ))}
            </Box>

            <Box sx={{ flex: "0 1 auto", mt: 6 }}>
              <AddTaskSidebarButtons
                addTaskList={addTaskList}
                handleAddResource={handleAddResource}
                onMemberSelect={handleMemberSelect}
                selectedIcon={selectedIcon}
                onIconSelect={handleIconSelect}
                onAttachmentSelect={handleAttachmentSelect}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
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
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#5E5F7D" }}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              Usuń
            </SmallButton>
          </Box>
        </form>
      </Dialog>
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onDeleteConfirm={handleDeleteConfirm}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
      />
    </>
  );
};

export default AddTaskModal;
