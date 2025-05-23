import {     UserOutlined } from "@ant-design/icons";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { MdDashboard } from "react-icons/md";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import ManageFacility from "../pages/admin/ManageFacility";
import Bookings from "../pages/admin/Bookings";
import AddAdmin from "../pages/admin/AddAdmin";



export const adminPaths = [
    {
        name: "Dashboard",
        icon: <MdDashboard />,
        element: <AdminDashboard />,
        path: 'dashboard',
    },
    // {
    //     name: "Category",
    //     icon: <BiCategory />,
    //     path: 'manage-category',
    //     element: <ManageCategory />
      
    // },
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