import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Facilities from "../pages/Facilities";
import Home from "../pages/Home";

export const viewersPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Facilities",
    path: "facilities",
    element: <Facilities />,
  },
  {
    name: "About",
    path: "about-us",
    element: <AboutUs />,
  },
  {
    name: "Contact",
    path: "contact-us",
    element: <ContactUs />,
  },
];
