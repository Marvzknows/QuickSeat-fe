import { useState } from "react";
import { ContextProviderType, UserType } from "../types/context";
import { UserContext } from "./userContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ContextProvider = ({ children }: ContextProviderType): JSX.Element => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [cookies, setCookies, removeCookies] = useCookies(["session"]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapse((prev) => !prev);
  };

  const saveSession = (user: UserType) => {
    setCookies("session", user, { path: "/" });
  };

  const removeSession = () => {
    removeCookies("session", { path: "/" });
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        isCollapse,
        toggleSidebar,
        saveSession,
        session: cookies.session,
        removeSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
