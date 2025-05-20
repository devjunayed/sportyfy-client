import {     UserOutlined } from "@ant-design/icons";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { MdDashboard } from "react-icons/md";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import ManageFacility from "../pages/admin/ManageFacility";
import AddAdmin from "../pages/admin/AddAdmin";
import Bookings from "../pages/admin/Bookings";


export const adminPaths = [
    {
        name: "Dashboard",
        icon: <MdDashboard />,
        element: <AdminDashboard />,
        path: 'dashboard',
    },
    {
        name: "Facility",
        icon: <PiBuildingOfficeDuotone />,
        path: 'manage-facility',
        element: <ManageFacility />
      
    },
    {
        name: "Bookings",
        icon: <IoCalendarClearOutline />,
        path: 'bookings',
        element: <Bookings />
    },
    {
        name: "Add Admin",
        icon: <UserOutlined />,
        path: 'add-admin',
        element: <AddAdmin />
    },
]