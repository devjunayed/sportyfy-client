import SButton from "@/components/UI/SButton";
import { Button } from "@heroui/button";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { MdExplore } from "react-icons/md";

const Hero = () => {
  return (
    <Card className="col-span-12 rounded-none -mt-16   sm:col-span-4 min-h-[60vh] max-h-[90vh] md:max-h-[80vh]">
      <CardHeader className="absolute z-15 mt-8 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex-col ">
        <h2 className="text-lg text-center md:text-3xl text-white/80 uppercase font-bold">
          Your Game. Your Time. Your Court.
        </h2>
        <h4 className="text-white md:w-1/2 text-center mt-2 md:mt-4">
          Explore the best sports facilities in your area and book instantly.
          Whether it&apos;s soccer, tennis, or basketball, we&apos;ve got you
          covered.
        </h4>
        <Button
          href="/facilities"
          as="a"
          variant="ghost"
          className="mt-2 md:mt-4 dark"
        >
          Explore <MdExplore />
        </Button>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0  w-full min-h-[60vh] rounded-none md:object-cover object-cover"
        src="/assets/images/bg.gif"
      />
      <div className="absolute inset-0 bg-black/30 z-10" />
    </Card>
  );
};

export default Hero;
