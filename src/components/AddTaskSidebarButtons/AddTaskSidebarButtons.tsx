import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CalendarModal from "../modals/CalendarModal/CalendarModal";
import MembersModal from "../modals/MembersModal/MembersModal";
import IconsModal from "../modals/IconsModal/IconsModal";
import AttachmentModal from "../modals/AttachmentModal/AttachmentModal";
import ResourcesModal from "../modals/ResourcesModal/ResourcesModal";
import TaskListModal from "../modals/TaskListModal/TaskListModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MembersIcon from "../../assets/icons/TaskIcons/MembersIcon.svg";
import StartDateIcon from "../../assets/icons/TaskIcons/StartDateIcon.svg";
import EndDateIcon from "../../assets/icons/TaskIcons/EndDateIcon.svg";
import IconsIcon from "../../assets/icons/TaskIcons/IconsIcon.svg";
import AttachmentIcon from "../../assets/icons/TaskIcons/AttachmentIcon.svg";
import TaskListIcon from "../../assets/icons/TaskIcons/TaskslistIcon.svg";
import ResourcesIcon from "../../assets/icons/TaskIcons/ResourcesIcon.svg";
import { Resource, User, Icon, Attachment } from "../../types";
import dayjs from "dayjs";

type ListItemType = {
  text: string;
  icon: React.ReactElement;
  modal: string;
  specialStyle?: boolean;
};
type ModalName =
  | "members"
  | "startDate"
  | "endDate"
  | "icons"
  | "attachment"
  | "taskList"
  | "resources";

type AddTaskSidebarButtonsProps = {
  addTaskList: (taskText: string) => void;
  handleAddResource: (resource: Resource) => void;
  onMemberSelect: (member: User) => void;
  selectedIcon: Icon;
  onIconSelect: (icon: Icon) => void;
  onAttachmentSelect: (attachments: Attachment[]) => void;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  onStartDateChange: (date: dayjs.Dayjs | null) => void;
  onEndDateChange: (date: dayjs.Dayjs | null) => void;
};

const AddTaskSidebarButtons = ({
  addTaskList,
  handleAddResource,
  onMemberSelect,
  selectedIcon,
  onIconSelect,
  onAttachmentSelect,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: AddTaskSidebarButtonsProps) => {
  const resourcesItem = {
    text: "Dodaj zasoby",
    icon: <img src={ResourcesIcon} alt="Resources" />,
    modal: "resources",
    specialStyle: true,
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState<ModalName | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    modalName: ModalName
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenModal(modalName);
  };

  const handleCloseModal = () => {
    setAnchorEl(null);
    setOpenModal(null);
  };

  const listItems: ListItemType[] = [
    {
      text: "Członkowie",
      icon: <img src={MembersIcon} alt="members" />,
      modal: "members",
    },
    {
      text: "Data rozpoczęcia",
      icon: <img src={StartDateIcon} alt="Calendar" />,
      modal: "startDate",
    },
    {
      text: "Data zakończenia",
      icon: <img src={EndDateIcon} alt="Calendar" />,
      modal: "endDate",
    },
    {
      text: "Ikonki",
      icon: <img src={IconsIcon} alt="Icons" />,
      modal: "icons",
    },
    {
      text: "Załącznik",
      icon: <img src={AttachmentIcon} alt="Attachment" />,
      modal: "attachment",
    },
    {
      text: "Lista zadań",
      icon: <img src={TaskListIcon} alt="TaskList" />,
      modal: "taskList",
    },
  ];

  const combinedListItems = [...listItems, resourcesItem];

  const renderModal = (modalName: ModalName) => {
    switch (modalName) {
      case "members":
        return (
          <MembersModal
            open={openModal === "members"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            onMemberSelect={onMemberSelect}
          />
        );
      case "startDate":
        return (
          <CalendarModal
            open={openModal === "startDate"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            value={startDate}
            onChange={onStartDateChange}
            title="Data rozpoczęcia"
          />
        );
      case "endDate":
        return (
          <CalendarModal
            open={openModal === "endDate"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            value={endDate}
            onChange={onEndDateChange}
            title="Data zakończenia"
          />
        );
      case "icons":
        return (
          <IconsModal
            open={openModal === "icons"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            selectedIcon={selectedIcon}
            onIconSelect={onIconSelect}
          />
        );
      case "attachment":
        return (
          <AttachmentModal
            open={openModal === "attachment"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            onAttachmentSelect={onAttachmentSelect}
          />
        );
      case "taskList":
        return (
          <TaskListModal
            open={openModal === "taskList"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            addTaskList={addTaskList}
          />
        );
      case "resources":
        return (
          <ResourcesModal
            open={openModal === "resources"}
            anchorEl={anchorEl}
            onClose={handleCloseModal}
            handleAddResource={handleAddResource}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      <Typography sx={{ fontSize: "1rem" }}>Dodaj do karty</Typography>
      <List component="nav" aria-label="sidebar navigation">
        {combinedListItems.map((item: ListItemType, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                bgcolor: item.specialStyle
                  ? "transparent"
                  : theme.palette.secondary.main,
                my: 0.3,
                py: 0.2,
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                width: "100%",
                borderRadius: "5px",
              }}
              onClick={(event) => handleOpenModal(event, item.modal)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon sx={{ minWidth: "auto", marginRight: "8px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {openModal && renderModal(openModal)}
    </Box>
  );
};

export default AddTaskSidebarButtons;
