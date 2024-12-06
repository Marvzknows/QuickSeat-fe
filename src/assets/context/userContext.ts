import { createContext } from "react";
import { UserContextType } from "../../types/context";

export const UserContext = createContext<UserContextType>({
  isCollapse: false,
  toggleSidebar: () => {},
});
