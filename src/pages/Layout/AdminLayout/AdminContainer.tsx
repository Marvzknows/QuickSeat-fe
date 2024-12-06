import { ReactNode } from "react";

type AdminContainerType = {
    children: ReactNode
    className?: string
}

const AdminContainer = ({children, className}: AdminContainerType) => {

    return(
        <div className={`w-full h-full rounded-lg overflow-auto flex flex-col ${className}`}>
            {children}
        </div>
    )
}

export default AdminContainer;