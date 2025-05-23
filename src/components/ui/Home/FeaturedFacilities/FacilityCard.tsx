
import { StarFilled } from "@ant-design/icons";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import { Clock, MapIcon, Users } from "lucide-react";


const FacilityCard = ({ facility }: { facility: FacilitiesDataType }) => {
  return (
    <a
      href={`/facility/${facility?._id}`}
      key={facility._id}
      className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={facility.images[0] || "/placeholder.svg"}
          alt={facility.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-900">
          {facility?.category}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {facility.name}
          </h3>
          <div className="flex items-center gap-1">
            <StarFilled className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {facility?.rating}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-1 text-gray-500">
          <MapIcon className="h-4 w-4" />
          <span className="text-sm">{facility.location}</span>
        </div>

        <div className="space-y-2 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{facility?.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{facility?.openHours}</span>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-gray-50 px-3 py-2">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Highlight: </span>
            {facility?.highlight}
          </p>
        </div>
      </div>
    </a>
  );
};

export default FacilityCard;
