import { ReactNode } from "react";

export type UserContextType = {
  isCollapse: boolean;
  toggleSidebar: () => void;
};

export type ContextProviderType = {
  children: ReactNode;
};
