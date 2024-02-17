import { useEffect, useState } from "react";
import { useFormik } from "formik";

import StyledDescriptionField from "../../styledComponents/StyledDescriptionField";
import {
  DialogContent,
  Dialog,
  Typography,
  TextareaAutosize,
  Box,
  FormControlLabel,
  Checkbox,
  Avatar,
  Stack,
} from "@mui/material";
import CloseButton from "../CloseButton/CloseButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddTaskSidebarButtons from "../AddTaskSidebarButtons/AddTaskSidebarButtons";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../../styledComponents/SmallButton";
import { TaskListItem, Resource, User, Icon } from "../../types";
import EditableText from "../EditableText/EditableText";
import AttachmentIcon from "../../assets/icons/TaskIcons/AttachmentIcon.svg";
import { Task } from "../../types";
import { useTaskStore } from "../../store/TaskStore";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import * as Yup from "yup";
import { toast } from "react-toastify";

type AddTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onAddTask: (task: { id: string; name: string; description?: string }) => void;
  handleAddResource: (resource: Resource) => void;
  selectedIcon: Icon | null;
  onIconSelect: (icon: Icon | null) => void;
  onAttachmentSelect: (attachment: File) => void;
  selectedTask?: Task;
};

const taskValidationSchema = Yup.object({
  name: Yup.string()
    .trim() // Trims whitespace from both ends of the string
    .min(1, "Task name must contain at least 1 character.") // Ensures at least one character is present
    .required("Task name is required."),
  // Include other fields and validation rules as needed
});

const AddTaskModal = ({
  isOpen,
  handleClose,
  onIconSelect,
  selectedTask,
}: AddTaskModalProps) => {
  const [tasksList, setTasksList] = useState([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const { addTask, updateTask, deleteTask } = useTaskStore();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    selectedTask ? dayjs(selectedTask.startDate) : null
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    selectedTask ? dayjs(selectedTask.endDate) : null
  );

  const handleAttachmentSelect = (file: File) => {
    setAttachment(file);
  };

  const handleIconSelect = (icon: Icon | null) => {
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
    if (selectedTask) {
      // Pre-populate the states if editing an existing task
      setSelectedMembers(selectedTask.members || []);
      // setTasksList(selectedTask.taskList || []);
      // setResources(selectedTask.resources || []);
      // setAttachment(selectedTask.attachments?.[0] || null); // Assuming only one attachment for simplicity
    } else {
      // Reset states for a new task
      setTasksList([]);
      setResources([]);
      setSelectedMembers([]);
      setAttachment(null);
    }
  }, [selectedTask, isOpen]);

  const formik = useFormik({
    initialValues: {
      name: selectedTask?.name ?? "",
      description: selectedTask?.description ?? "",
      members: selectedTask?.members ?? [],
      startDate: selectedTask?.startDate ?? null,
      endDate: selectedTask?.endDate ?? null,
      icon: selectedTask?.icon ?? null,
      attachments: selectedTask?.attachments ?? [],
      taskList: selectedTask?.taskList ?? [],
      resources: selectedTask?.resources ?? [],
    },

    validationSchema: taskValidationSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (!formik.isValid) {
        toast.error("Please fix the validation errors.");
        setErrors(formik.errors);
        return;
      }

      toast.success("Task added successfully!");

      const taskData = {
        ...values,
        members: selectedMembers,
        startDate: startDate ? dayjs(startDate).toISOString() : null,
        endDate: endDate ? dayjs(endDate).toISOString() : null,
        icon: selectedTask?.icon ?? null,
        attachments: attachment ? [attachment] : [],
        taskList: tasksList,
        resources: resources,
        status: selectedTask ? selectedTask.status : "todo",
      };

      if (selectedTask?.id) {
        // Update existing task
        updateTask(selectedTask.id, taskData)
          .then(() => toast.success("Task updated successfully!"))
          .catch((error) => toast.error(`Update failed: ${error.message}`));
      } else {
        // Add new task
        addTask(taskData)
          .then(() => toast.success("Task added successfully!"))
          .catch((error) => toast.error(`Add failed: ${error.message}`));
      }

      resetForm();
      handleClose();

      onIconSelect(null);
    },
    enableReinitialize: true,
  });

  const theme = useTheme();

  const addTaskList = (taskText: string) => {
    setTasksList((currentTasks: TaskListItem[]) => [
      ...currentTasks,
      { id: Date.now(), text: taskText, checked: false },
    ]);
  };

  const additionalMembersCount = selectedMembers.length - 2;

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const onDelete = () => {
    setIsConfirmDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (selectedTask?.id) {
      deleteTask(selectedTask.id)
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
    console.log("Selected task from useEffect:", selectedTask); // For debugging
  }, [selectedTask]);

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

                {selectedIcon && (
                  <img
                    src={selectedIcon.imageUrl}
                    alt={selectedIcon.iconName}
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                )}
                <CloseButton onClick={handleClose} right={20} top={20} />
              </Box>

              {selectedMembers.length > 0 && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Członkowie</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {selectedMembers.slice(0, 2).map((user, index) => (
                      <Avatar
                        key={user.id}
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                          width: 40,
                          height: 40,
                          border: "2px solid white",
                          position: "absolute",
                          left: `${index * 25}px`,
                          zIndex: 1,
                        }}
                      />
                    ))}

                    {additionalMembersCount > 0 && (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "grey",
                          borderRadius: "50%",
                          position: "absolute",
                          left: `${2 * 25}px`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 0,
                        }}
                      >
                        <Typography color="white">{`+${additionalMembersCount}`}</Typography>
                      </Box>
                    )}
                  </Box>
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

              {attachment && (
                <>
                  <Typography variant="subtitle1">Załącznik</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Typography
                      component="a"
                      href={URL.createObjectURL(attachment)} // Creates a URL for the file object
                      download={attachment.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={AttachmentIcon} alt="Załącznik" />{" "}
                      {attachment.name}
                    </Typography>
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

              {tasksList.map((task) => (
                <Box key={task}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task}
                        // onChange={(e) => {
                        //   const newTasksList = [...tasksList];
                        //   newTasksList[index].isChecked = e.target.checked;
                        //   setTasksList(newTasksList);
                        // }}
                      />
                    }
                    label={task}
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
                selectedIcon={selectedIcon ? selectedIcon.iconName : null}
                onIconSelect={handleIconSelect}
                onAttachmentSelect={handleAttachmentSelect}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                taskId={selectedTask?.id}
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
