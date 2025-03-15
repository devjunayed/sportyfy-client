import { Button } from "antd";
// import { useCheckAvailabilityQuery } from "../../../../redux/api/checkavailabilty/checkavailabiltyApi";
// import { useState } from "react";
import heroImg from "../../../../assets/images/bg.gif";
import { Link } from "react-router-dom";

const Hero = () => {
 
  return (
    <div
      className="hero mx-auto -mt-20 min-h-[98vh]"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
    
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="  text-white mt-20">
        <div className=" sm:px-20 md:px-28 lg:px-48">
          <h1 className="mb-5 text-2xl text-center text-white lg:text-5xl font-bold">
            Your Game. Your Time. Your Court.
          </h1>
          <p className="mb-5 text-center mx-4">
            Explore the best sports facilities in your area and book instantly.
            Whether it's soccer, tennis, or basketball, we’ve got you covered.
          </p>
        </div>
        <div className="text-xl px-10 sm:px-32 md:px-56 lg:px-96">
     
          
          <div className="flex gap-4 justify-center text-xl">
            <Button className="text-white text-md hover:bg-gray-800 ">
              <Link to="/facilities">Book Now</Link>
            </Button>
            
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
