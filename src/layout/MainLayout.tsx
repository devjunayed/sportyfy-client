import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/Shared/Navbar/Navbar"
import Footer from "../components/ui/Shared/Footer/Footer"

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
