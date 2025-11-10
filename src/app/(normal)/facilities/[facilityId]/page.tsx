"use client";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import { useGetSingleFacilityQuery } from "@/redux/api/dashboard/facilityApi";
import { useParams, useRouter } from "next/navigation";
import FacilitySlider from "./_components/FacilitySlider";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import FacilityTab from "./_components/FacilityTab";
import { TiArrowLeftOutline } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Clock, MapIcon, Users } from "lucide-react";
import { BiStar } from "react-icons/bi";

const FacilityDetailsPage = () => {
  const { facilityId } = useParams();
  const navigate = useRouter();
  const { data: facility, isLoading } = useGetSingleFacilityQuery(
    facilityId as string
  );

  return (
    <div className=" max-w-7xl mx-auto px-4 md:px-0 ">
      <Button
        onPress={() => navigate.back()}
        className="bg-[#1B1F3B] text-white mt-4 ml-2 flex gap-2"
      >
        <TiArrowLeftOutline /> Back
      </Button>

      {/*content  */}
      <HandleDataLoading isLoading={isLoading} data={facility?.data}>
        <div className="w-full my-6">
          <div className="flex justify-between items-start gap-10 flex-col lg:flex-row">
            <div className="lg:w-1/2 w-full mx-auto ">
              <FacilitySlider images={facility?.data?.images as string[]} />
            </div>
            {/* texts */}
            <div className="lg:w-1/2 flex flex-col gap-4  ">
              <h1 className="text-2xl font-bold">{facility?.data?.name}</h1>
              <div className="flex gap-2">
                <Chip>{facility?.data?.category}</Chip>
                <Chip className="  rounded-full  px-3 py-1 text-xs font-medium  shadow-sm ">
                  <div className="flex items-center gap-1 ">
                    <BiStar className="text-sm" />
                    <span className="text-sm font-medium ">
                      {facility?.data?.rating?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                </Chip>
              </div>
              <p className="">{facility?.data?.shortDescription}</p>
              <Divider />
              <div className="flex items-center gap-2  text-sm">
                <MapIcon size={16} />
                <span>{facility?.data?.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 " />
                <span>{facility?.data?.capacity} people</span>
              </div>
              <div className="flex items-center gap-2 text-sm ">
                <Clock className="h-4 w-4 " />
                <span>{facility?.data?.openHours}</span>
              </div>

              {/* Highlight */}
              <div className="rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#18181B] bg-gray-50 p-3">
                <span className="text-sm ">
                  <strong className="">Highlight:</strong>{" "}
                  {facility?.data?.highlight}
                </span>
              </div>

              <Divider />
              <div className="flex-col flex items-center mt-4 justify-between lg:mx-20 gap-10 ">
                <Button className="bg-[#1B1F3B] text-white">
                  <Link
                    href={`/booking/${facilityId}`}
                    type="primary"
                    className="flex items-center gap-2"
                  >
                    Book Now <IoCalendarNumberOutline />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <FacilityTab facility={facility?.data} />
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default FacilityDetailsPage;
