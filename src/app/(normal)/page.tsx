import React from "react";
import Hero from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";
import FeaturedFacilities from "./components/FeaturedFacilities/FeaturedFacilities";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import OffersPromotions from "./components/OffersPromotions/OffersPromotions";
import Testimonials from "./components/Testimonials/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedFacilities />
      <HowItWorks />
      <Testimonials />
      <OffersPromotions />
    </div>
  );
};

export default HomePage;
