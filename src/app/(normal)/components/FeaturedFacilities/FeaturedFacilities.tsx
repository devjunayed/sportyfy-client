"use client"
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "@/types/facility.type";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";

import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";
import FacilityCard from "./FacilityCard";

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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilities?.data
              ?.slice(0, 6)
              .map((facility: FacilitiesDataType, index: number) => (
                <FacilityCard key={index} facility={facility} />
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
