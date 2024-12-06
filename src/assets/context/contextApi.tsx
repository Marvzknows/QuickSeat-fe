import { useState } from "react";
import { ContextProviderType } from "../../types/context";
import { UserContext } from "./userContext";

const ContextProvider = ({ children }: ContextProviderType): JSX.Element => {
  const [isCollapse, setIsCollapse] = useState(true);

  const toggleSidebar = () => {
    setIsCollapse((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ isCollapse, toggleSidebar }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
