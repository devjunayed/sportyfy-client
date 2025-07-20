// import {     UserOutlined } from "@ant-design/icons";
import AdminDashboard from "@/app/admin/components/AdminDashboard";
import ManageCategory from "@/app/admin/components/ManageCategory";
import { BiCategory } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
// import { IoCalendarClearOutline } from "react-icons/io5";
// import Bookings from "../pages/admin/Bookings";
// import AddAdmin from "../pages/admin/AddAdmin";
// import ManageSlots from "../pages/admin/ManageSlots";
// import { Clock } from "lucide-react";
// import { GiPingPongBat } from "react-icons/gi";
// import ManageFacility from "../pages/admin/ManageFacility";



export const adminPaths = [
    {
        name: "Dashboard",
        icon: <MdDashboard size={16} />,
        element: <AdminDashboard />,
        path: 'dashboard',
    },
    {
        name: "Category",
        icon: <BiCategory />,
        path: 'manage-category',
        element: <ManageCategory />
      
    },
   
   
    // {
    //     name: "facility",
    //     icon: <GiPingPongBat size={16} />,
    //     path: 'manage-facilities',
    //     element: <ManageFacility />
    // },
    // {
    //     name: "Bookings",
    //     icon: <IoCalendarClearOutline size={16} />,
    //     path: 'manage-bookings',
    //     element: <Bookings />
    // },
    // {
    //     name: "Slots",
    //     icon: <Clock size={16} />,
    //     path: 'manage-slots',
    //     element: <ManageSlots />
    // },
    // {
    //     name: "Manage Admin",
    //     icon: <UserOutlined size={16} />,
    //     path: 'manage-admin',
    //     element: <AddAdmin />
    // },
]