import Facilities from "../pages/Facilities";
import Home from "../pages/Home";

export const viewersPath = [
    {
        name: "Home",
        path: '/',
        element: <Home />,
    },
    {
        name: "Facilities",
        path: "facilities",
        element: <Facilities />
    }

]