/* eslint-disable @next/next/no-img-element */
import { StarFilled } from "@ant-design/icons";
import { FacilitiesDataType } from "@/types/facility.type";
import { Clock, MapIcon, Users } from "lucide-react";

const FacilityCard = ({ facility }: { facility: FacilitiesDataType }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
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
          <div className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
            {facility?.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title & Rating */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {facility.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <StarFilled className="text-sm" />
              <span className="text-sm font-medium text-gray-800">
                {facility?.rating?.toFixed(1) ?? "N/A"}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapIcon className="h-4 w-4" />
            <span>{facility.location}</span>
          </div>

          {/* Capacity & Hours */}
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{facility?.capacity} people</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{facility?.openHours}</span>
            </div>
          </div>

          {/* Highlight */}
          <div className="rounded-md bg-gray-50 p-3">
            <span className="text-sm text-gray-700">
              <strong className="text-gray-900">Highlight:</strong>{" "}
              {facility?.highlight}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FacilityCard;
