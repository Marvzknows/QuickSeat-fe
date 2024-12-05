import { ReactNode } from "react";

type AdminContainerType = {
    children: ReactNode
}

const AdminContainer = ({children}: AdminContainerType) => {

    return(
        <div className="w-full h-full rounded-lg overflow-auto">
            {children}
        </div>
    )
}

export default AdminContainer;