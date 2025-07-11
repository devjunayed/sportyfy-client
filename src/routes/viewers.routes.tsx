
// import HomePage from "@/app/(normal)/page"
// import Facilities from 
// import Booking from 
// import FacilityDetails 
// import ProtectedRoute 
// import AboutUs from 
// import ContactUs from 

import Facilities from "@/app/(normal)/facilities/page";
import HomePage from "@/app/(normal)/page";

export const viewersPath = [
  {
    name: "Home",
    path: "/",
    element: <HomePage />,
  },
  {
    name: "Facilities",
    path: "/facilities",
    element: <Facilities />,
  },
  // {
  //   name: "About",
  //   path: "/about",
  //   element: <AboutUs />,
  // },
  // {
  //   name: "Contact",
  //   path: "/contact",
  //   element: <ContactUs />,
  // },

 
  // {
  //   path: "/facility/:id",
  //   element: <FacilityDetails />,
  //   loader: ({ params }: { params: string }) => params,
  // },
  // {
  //   path: "/booking/:id",
  //   element: (
  //     <ProtectedRoute role={undefined}>
  //       <Booking />
  //     </ProtectedRoute>
  //   ),
  //   loader: ({ params }: { params: string }) => params,
  // },
];
