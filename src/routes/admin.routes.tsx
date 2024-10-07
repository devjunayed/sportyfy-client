import { FolderOutlined } from "@ant-design/icons";
import AdminDashboard from "../pages/admin/AdminDashboard";


export const adminPaths = [
    {
        name: "Dashboard",
        icon: <FolderOutlined />,
        element: <AdminDashboard />,
        path: 'dashboard',
    },
    {
        name: "Facility",
        icon: <FolderOutlined />,
        path: 'facility',
        children: [
            {
                name: "Create Facility",
                path: "create-facility",
                element: <AdminDashboard />
            }

        ]
    },
    {
        name: "Bookings",
        icon: <FolderOutlined />,
        path: 'bookings',
        element: <AdminDashboard />
    },
    {
        name: "Admin",
        icon: <FolderOutlined />,
        path: 'admin',
        element: <AdminDashboard />
    },
]