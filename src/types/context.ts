import { ReactNode } from "react";

export type UserContextType = {
  isCollapse: boolean;
  toggleSidebar: () => void;
  saveSession: (user: UserType) => void;
  session: UserType | null;
  removeSession: () => void;
  sessionExpired: () => void;
  globalMessage: string | null;
  setGlobalMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export type ContextProviderType = {
  children: ReactNode;
};

export type UserType = {
  acces_token: string;
  status: string;
  user_information: UserInformationType;
};

export type UserInformationType = {
  date_created: string;
  first_name: string;
  id: number;
  last_name: string;
  password: string;
  role: string;
  user_id: string;
  username: string;
};
