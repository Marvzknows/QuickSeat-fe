import { useState } from "react";
import { ContextProviderType, UserType } from "../types/context";
import { UserContext } from "./userContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ContextProvider = ({ children }: ContextProviderType): JSX.Element => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapse((prev) => !prev);
  };

  const saveSession = (user: UserType) => {
    setCookie("session", user);
  };

  const removeSession = () => {
    removeCookie("session");
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
