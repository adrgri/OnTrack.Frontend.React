export type UserProfileProps = {
  name: string;
  avatar: string;
};

// export type Task = {
//   text: string;
//   dueDate?: string;
//   assigneeAvatar?: string;
// };

export type IconSelection = {
  iconName: string;
  imageUrl: string;
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

export type Attachment = {
  id: string;
  url: string;
  name: string;
};

export type TaskListItem = {
  id: number;
  text: string;
  isChecked: boolean;
};

export type Resource = {
  id: number;
  resourceName: string;
  quantity: string;
  unit: string;
};

export type Status = "todo" | "inProgress" | "done";

export type Task = {
  id: string;
  name: string;
  description?: string;
  members?: User[];
  startDate?: Date;
  dueDate?: Date;
  icon?: IconSelection;
  attachments?: Attachment[];
  taskList?: TaskListItem[];
  resources?: Resource[];
  status: Status;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password?: string;
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
