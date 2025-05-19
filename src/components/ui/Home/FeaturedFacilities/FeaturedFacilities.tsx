import { useGetFacilitiesQuery } from "../../../../redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import HandleDataLoading from "../../Shared/HandleDataLoading/HandleDataLoading";

import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { StarFilled } from "@ant-design/icons";
import { Clock, MapIcon, Users } from "lucide-react";

const FeaturedFacilities = () => {
  const { data: facilities, isLoading } = useGetFacilitiesQuery("");

  return (
    <div className="max-w-7xl mx-auto py-10 ">
      <HandleDataLoading
        noDataOnError={true}
        isLoading={isLoading}
        data={facilities?.data}
      >
        <div>
          <SectionTitle
            title="Featured Facility"
            description="Discover our most popular and premium sports venues"
          />

          {/* <div className="grid grid-cols-4 gap-4">
            {facilities?.data
              ?.slice(0, 4)
              .map((facility: FacilitiesDataType) => (
                <Link to={`/facility/${facility._id}`}>
                  <FacilityCard facility={facility} />
                </Link>
              ))}
          </div> */}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility: FacilitiesDataType) => (
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
                  <h3 className="text-xl font-semibold text-gray-900">{facility.name}</h3>
                  <div className="flex items-center gap-1">
                    <StarFilled className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{facility?.rating}</span>
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
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/facilities"
            className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            View All Facilities
          </a>
        </div>
         
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default FeaturedFacilities;
