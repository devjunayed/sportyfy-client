import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Facilities from "../pages/Facilities";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import FacilityDetails from "../pages/FacilityDetails";
import ProtectedRoute from "../layout/ProtectedRoute";

export const viewersPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Facilities",
    path: "/facilities",
    element: <Facilities />,
  },

  {
    name: "About",
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    name: "Contact",
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/facility/:id",
    element: <FacilityDetails />,
    loader: ({ params }: { params: string }) => params,
  },
  {
    path: "/booking/:id",
    element: (
      <ProtectedRoute role={undefined}>
        <Booking />
      </ProtectedRoute>
    ),
    loader: ({ params }: { params: string }) => params,
  },
];
