import { Button, Input } from "antd";

const Hero = () => {
  return (
    <div
      className="hero min-h-[80vh]"
      style={{
        backgroundImage: "url(../src/assets/images/hero-img.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="  text-white">
        <div className=" sm:px-20 md:px-28 lg:px-48">
          <h1 className="mb-5 text-2xl text-center text-white lg:text-5xl font-bold">
            Your Game. Your Time. Your Court.
          </h1>
          <p className="mb-5 text-center">
            Explore the best sports facilities in your area and book instantly.
            Whether it's soccer, tennis, or basketball, we’ve got you covered.
          </p>
        </div>
        <div className="text-xl px-10 sm:px-32 md:px-56 lg:px-96">
            <Input type="date" className="mb-5 " />
          <div className="flex gap-4 justify-center text-xl">
            <Button className="text-white text-md">Reserve Now</Button>
            <Button className="text-white text-md">Check Availability</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
