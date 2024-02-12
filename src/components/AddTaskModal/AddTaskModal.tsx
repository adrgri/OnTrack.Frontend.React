import { useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

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
import { TaskListItem, Resource, User, IconSelection } from "../../types";
import EditableText from "../EditableText/EditableText";
import AttachmentIcon from "../../assets/icons/TaskIcons/AttachmentIcon.svg";
import { Task } from "../../types";
import { useTaskStore } from "../../store/TaskStore";

type AddTaskModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onAddTask: (task: { id: string; name: string; description?: string }) => void;
  handleAddResource: (resource: Resource) => void;
  selectedIcon: IconSelection | null;
  onIconSelect: (icon: IconSelection | null) => void;
  onAttachmentSelect: (attachment: File) => void;
};

const AddTaskModal = ({
  isOpen,
  handleClose,
  onAddTask,
  onIconSelect,
  tasks2,
  setTasks2,
}: AddTaskModalProps) => {
  const [tasksList, setTasksList] = useState([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<IconSelection | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    members: [],
    dueDate: null,
    icon: null,
    attachments: [],
    taskList: [],
    resources: [],
    status: "todo",
  });
  const { addTask } = useTaskStore();

  const handleAttachmentSelect = (file: File) => {
    setAttachment(file);
  };

  const handleIconSelect = (icon: IconSelection | null) => {
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

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      members: [],
      dueDate: null,
      icon: null,
      attachments: [],
      taskList: [],
      resources: [],
    },
    onSubmit: (values, { resetForm }) => {
      const newTask: Task = {
        name: values.name,
        description: values.description,
        members: selectedMembers,
        dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
        icon: selectedIcon,
        attachments: attachment ? [attachment] : [],
        taskList: tasksList,
        resources: resources,
        status: "todo",
      };

      addTask(newTask)
        .then(() => {
          resetForm();
          handleClose();
        })
        .catch((error) => {
          console.error("Failed to add task:", error);
        });

      onIconSelect(null);
    },
  });

  const theme = useTheme();

  const addTaskList = (taskText: string) => {
    setTasksList((currentTasks: TaskListItem[]) => [
      ...currentTasks,
      { id: Date.now(), text: taskText, checked: false },
    ]);
  };

  const additionalMembersCount = selectedMembers.length - 2;

  function onDelete() {
    if (task.id) {
      console.log("Deleting task with id: ", task.id);
    }
  }

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

            {attachment && (
              <>
                <Typography variant="subtitle1">Załącznik</Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
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
                        const newTasksList = [...tasksList];
                        newTasksList[index].isChecked = e.target.checked;
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
              selectedIcon={selectedIcon ? selectedIcon.iconName : null}
              onIconSelect={handleIconSelect}
              onAttachmentSelect={handleAttachmentSelect}
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
            onClick={onDelete}
          >
            Usuń
          </SmallButton>
        </Box>
      </form>
    </Dialog>
  );
};

export default AddTaskModal;
