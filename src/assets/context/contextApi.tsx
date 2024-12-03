import { createContext, useState } from "react";
import { ContextProviderType, UserContextType } from "../../types/context";

export const UserContext = createContext<UserContextType>({
    isCollapse: false,
    toggleSidebar: () => {},
})

const ContextProvider = ({children}: ContextProviderType): JSX.Element => {
    // Define Cookies here
    const [isCollapse, setIsCollapse] = useState(true);

    const toggleSidebar = () => {
        setIsCollapse(prev => !prev);
    }

    return(
        <UserContext.Provider value={{ isCollapse, toggleSidebar }}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextProvider;