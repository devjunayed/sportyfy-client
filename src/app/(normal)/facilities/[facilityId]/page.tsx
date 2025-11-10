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
            <div className="lg:w-1/2 flex flex-col  ">
              <h1 className="text-2xl font-bold">{facility?.data?.name}</h1>
              <Chip>{facility?.data?.category}</Chip>
              <p className="text-base mt-4 flex items-center gap-2">
                <CiLocationOn /> {facility?.data?.location}{" "}
              </p>
              <p className="py-6">{facility?.data?.shortDescription}</p>
              {/* Highlight */}
              <div className="rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#18181B] bg-gray-50 p-3">
                <span className="text-sm ">
                  <strong className="">Highlight:</strong> {facility?.data?.highlight}
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
