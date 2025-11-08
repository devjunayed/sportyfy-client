import {     UserOutlined } from "@ant-design/icons";
import { BiCategory } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";

import { Clock } from "lucide-react";
import { GiPingPongBat } from "react-icons/gi";



export const adminPaths = [
    {
        name: "Dashboard",
        icon: <MdDashboard size={16} />,
        path: 'dashboard',
    },
    {
        name: "Category",
        icon: <BiCategory />,
        path: 'dashboard/manage-category',
      
    },
   
   
    {
        name: "facility",
        icon: <GiPingPongBat size={16} />,
        path: 'dashboard/manage-facilities',
    },
    {
        name: "Bookings",
        icon: <IoCalendarClearOutline size={16} />,
        path: 'dashboard/manage-bookings',
    },
    {
        name: "Slots",
        icon: <Clock size={16} />,
        path: 'dashboard/manage-slots',
    },
    {
        name: "Manage Admin",
        icon: <UserOutlined size={16} />,
        path: 'dashboard/manage-admin',
    },
]