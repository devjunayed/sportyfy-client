import Categories from "../components/ui/Home/Categories/Categories"
import FeaturedFacilities from "../components/ui/Home/FeaturedFacilities/FeaturedFacilities"
import Hero from "../components/ui/Home/Hero/Hero"
import HowItWorks from "../components/ui/Home/HowItWorks/HowItWorks"
import OffersPromotions from "../components/ui/Home/OffersPromotions/OffersPromotions"
import Testimonials from "../components/ui/Home/Testimonials/Testimonials"

const Home = () => {
  return (
    <div>
     <Hero />
     <Categories />
     <FeaturedFacilities />
     <HowItWorks />
     <Testimonials />
     <OffersPromotions />
    </div>
  )
}

export default Home
