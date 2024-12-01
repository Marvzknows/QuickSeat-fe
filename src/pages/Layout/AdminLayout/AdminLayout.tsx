import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

const AdminLayout = () => {

    return (
        <div className="flex flex-row gap-2 bg-secondary min-h-screen w-full p-2.5">
            <SideBar />
            <main className="border border-success w-full p-2.5 rounded-lg flex flex-col">
                <div className="w-full bg-white rounded shadow p-2.5 mb-2">Welcome Admin</div>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout;