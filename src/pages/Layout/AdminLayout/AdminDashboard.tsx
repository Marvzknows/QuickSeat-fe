import { Outlet } from "react-router-dom";

const AdminDashboard = () => {

    return(
        <div className="flex flex-row gap-2 border border-danger bg-secondary min-h-screen w-full p-2.5">

            {/* SideBar */}
            <div className="border border-success h-[calc(100vh-32px)] my-auto w-72">
                lorem209
            </div>

            {/* Outlet, NOTE: Ipaloob sa isang layout component yung mismong outlet */}
            <div className="border-4 border-danger w-full">
                {/* <Outlet /> */}
                ADMIN DASHBOARD CONTENT
            </div>
        </div>
    )
}

export default AdminDashboard;