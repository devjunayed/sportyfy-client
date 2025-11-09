/* eslint-disable @next/next/no-img-element */
import { FacilitiesDataType } from "@/types/facility.type";
import { Clock, MapIcon, Users } from "lucide-react";
import { BiStar } from "react-icons/bi";

const FacilityCard = ({ facility }: { facility: FacilitiesDataType }) => {
  return (
    <div className="rounded-xl  dark:bg-[#18181B]   shadow-xl hover:shadow-md transition-shadow duration-300 text-gray-700 dark:text-gray-400">
      <a
        href={`/facility/${facility?._id}`}
        className="group block overflow-hidden rounded-xl"
      >
        {/* Image + Category */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <img
            src={facility.images[0] || "/placeholder.svg"}
            alt={facility.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 rounded-full  px-3 py-1 text-xs font-medium  shadow-sm dark:bg-[#1b1b1b] bg-white dark:text-gray-400 text-gray-700">
            {facility?.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title & Rating */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold ">
              {facility.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <BiStar className="text-sm" />
              <span className="text-sm font-medium ">
                {facility?.rating?.toFixed(1) ?? "N/A"}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2  text-sm">
            <MapIcon className="h-4 w-4" />
            <span>{facility.location}</span>
          </div>

          {/* Capacity & Hours */}
          <div className="flex justify-between text-sm ">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 " />
              <span>{facility?.capacity} people</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 " />
              <span>{facility?.openHours}</span>
            </div>
          </div>

          {/* Highlight */}
          <div className="rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#18181B] bg-gray-50 p-3">
            <span className="text-sm ">
              <strong className="">Highlight:</strong>{" "}
              {facility?.highlight}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FacilityCard;
