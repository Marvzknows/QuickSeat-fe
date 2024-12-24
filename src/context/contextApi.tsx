import { useState } from "react";
import { ContextProviderType, UserType } from "../types/context";
import { UserContext } from "./userContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ContextProvider = ({ children }: ContextProviderType): JSX.Element => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);
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
    setGlobalMessage(null);
    navigate("/");
  };

  const sessionExpired = () => {
    setGlobalMessage("Session Expired");
  };

  return (
    <UserContext.Provider
      value={{
        isCollapse,
        toggleSidebar,
        saveSession,
        session: cookies.session,
        removeSession,
        sessionExpired,
        globalMessage,
        setGlobalMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
