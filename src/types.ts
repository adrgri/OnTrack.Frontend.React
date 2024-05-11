import dayjs from "dayjs";

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
};

// Picking specific properties from User and making them optional
export type Member = Omit<User, "password">;

// export type Member = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   avatar: string;
// };

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
  id: string;
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
  startDate?: dayjs.Dayjs | null | undefined | string;
  endDate?: dayjs.Dayjs | null | undefined | string;
  icon?: Icon | null;
  attachments?: Attachment[];
  taskList?: TaskListItem[];
  resources?: Resource[];
  status: Status;
  projectId?: string | undefined;
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

// export type Project = {
//   id?: string | undefined;
//   title: string;
//   description?: string;
//   members?: string[];
//   endDate?: dayjs.Dayjs | null | undefined | string;
//   tasksAmount?: number | undefined;
//   progress?: number | undefined;
//   membersIds?: string[] | undefined;
// };

export type Project = {
  id?: string;
  title: string;
  description?: string;
  memberIds?: string[] | undefined;
  taskIds?: string[] | undefined;
};
