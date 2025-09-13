import React from "react";
import Hero from "./_components/Hero/Hero";
import Categories from "./_components/Categories/Categories";
import FeaturedFacilities from "./_components/FeaturedFacilities/FeaturedFacilities";
import HowItWorks from "./_components/HowItWorks/HowItWorks";
import OffersPromotions from "./_components/OffersPromotions/OffersPromotions";
import Testimonials from "./_components/Testimonials/Testimonials";

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
