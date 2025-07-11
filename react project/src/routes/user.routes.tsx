import { MdDashboard } from "react-icons/md";
import UserDashboard from "../pages/user/UserDashboard";
import { IoCalendarClearOutline } from "react-icons/io5";
import UserBookings from "../pages/user/UserBookings";


export const userPaths = [
    {
        name: "Dashboard",
        path: 'dashboard',
        icon: <MdDashboard />,
        element: <UserDashboard/>
    },
    {
        name: "Bookings",
        path: 'bookings',
        icon: <IoCalendarClearOutline />,
        element: <UserBookings/>
    },
]