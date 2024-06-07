export type UserProfileProps = {
  name?: string;
  avatar: string;
  setAvatarFile?: (file: File) => void;
};

export type Icon = {
  iconName: string;
  imageUrl: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password?: string;
  projectIds?: string[];
};

export interface Attachment extends File {
  id?: string;
  url: string;
  name: string;
}

export type TaskListItem = {
  id: string;
  text: string;
  isChecked: boolean;
};

export type Resource = {
  id?: string;
  name: string;
  quantity: string;
  unit: string;
  taskId?: string;
};

export type ListItemType = {
  text: string;
  icon: React.ReactElement;
  modal: string;
  specialStyle?: boolean;
};

export type StatusOptions = "todo" | "inProgress" | "done";

export type Status = {
  id: string;
  name: string;
  order?: number;
};

export type Task = {
  id?: string;
  projectId: string | null | undefined;
  title: string;
  description?: string;
  startDate?: string | null;
  dueDate?: string | null;
  statusId?: string;
  iconId?: string;
  isCompleted: boolean;
  assignedMemberIds?: string[];
  assignedResourceIds?: string[];
  attachmentIds?: string[];
  subtaskIds?: string[];
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegistrationResult = {
  success: boolean;
  message?: string;
};

export type Project = {
  id?: string;
  title: string;
  description?: string;
  memberIds?: string[];
  taskIds?: string[] | undefined;
  dueDate?: Date;
};

export type Member = {
  id?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  // avatar?: string;
};
