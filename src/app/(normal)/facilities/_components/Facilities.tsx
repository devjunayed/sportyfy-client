"use client";
import React, { useEffect, useState } from "react";
import { Grid2x2, List, Search } from "lucide-react";
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "@/types/facility.type";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import FacilityCard from "../../_components/FeaturedFacilities/FacilityCard";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Tooltip } from "@heroui/tooltip";
import { Slider } from "@heroui/slider";
import { Button } from "@heroui/button";

const Facilities = () => {
  const [queryUrl, setQueryUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    data: facilityData,
    refetch: refetchFacilities,
    isLoading,
  } = useGetFacilitiesQuery(queryUrl);

  const updateQueryUrl = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("minPrice", priceRange[0].toString());
    queryParams.append("maxPrice", priceRange[1].toString());
    queryParams.append("page", (currentPage - 1).toString());
    queryParams.append("limit", limit.toString());
    if (searchTerm) queryParams.append("search", searchTerm);
    if (sortBy !== "default") queryParams.append("sortBy", sortBy);
    setQueryUrl(queryParams.toString());
  };

  useEffect(() => {
    updateQueryUrl();
  }, [priceRange, currentPage, limit, sortBy]);

  useEffect(() => {
    if (queryUrl) refetchFacilities();
  }, [queryUrl, refetchFacilities]);

  const handleSearch = () => {
    setCurrentPage(1);
    updateQueryUrl();
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const toggleView = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  return (
    <section className="max-w-7xl mx-auto pt-4  px-4 pb-20">
      {/* --- Filters --- */}
      <Card className="p-6 mb-10 shadow-sm border border-gray-300 sticky top-0 bg-white/90 backdrop-blur-md z-30">
        <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         
        

          {/* Price Range */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Price Range
            </p>
            <Slider
              step={50}
              minValue={0}
              maxValue={5000}
              value={priceRange}
              onChange={() => handlePriceChange}
              aria-label="Price range"
              className="max-w-xs mx-auto"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{priceRange[0]} ৳</span>
              <span>{priceRange[1]} ৳</span>
            </div>
          </div>

          {/* Sort */}
          <Select
            label="Sort by"
            size="lg"
            onChange={(e) => setSortBy(e.target.value)}
            selectedKeys={[sortBy]}
          >
            <SelectItem key="default">Default</SelectItem>
            <SelectItem key="priceLowHigh">Price: Low to High</SelectItem>
            <SelectItem key="priceHighLow">Price: High to Low</SelectItem>
            <SelectItem key="ratingLowHigh">Rating: Low to High</SelectItem>
            <SelectItem key="ratingHighLow">Rating: High to Low</SelectItem>
            <SelectItem key="name">Name (A–Z)</SelectItem>
          </Select>

          {/* Filter by Category */}
          <Select
            label="Filter by Category"
            size="lg"
            onChange={(e) => setSortBy(e.target.value)}
            selectedKeys={[sortBy]}
          >
            <SelectItem key="default">Default</SelectItem>
            <SelectItem key="priceLowHigh">Price: Low to High</SelectItem>
            <SelectItem key="priceHighLow">Price: High to Low</SelectItem>
            <SelectItem key="ratingLowHigh">Rating: Low to High</SelectItem>
            <SelectItem key="ratingHighLow">Rating: High to Low</SelectItem>
            <SelectItem key="name">Name (A–Z)</SelectItem>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center justify-center gap-3">
            <Tooltip content="Grid view">
              <Button
                isIconOnly
                variant={viewMode === "grid" ? "solid" : "flat"}
                color="primary"
                onClick={() => toggleView("grid")}
              >
                <Grid2x2 className="h-5 w-5" />
              </Button>
            </Tooltip>
            <Tooltip content="List view">
              <Button
                isIconOnly
                variant={viewMode === "list" ? "solid" : "flat"}
                color="primary"
                onClick={() => toggleView("list")}
              >
                <List className="h-5 w-5" />
              </Button>
            </Tooltip>
          </div>
        </CardBody>
      </Card>

      {/* --- Facility Data --- */}
      <HandleDataLoading
        isLoading={isLoading}
        data={facilityData?.data}
        message="No Facility Found!"
      >
        <div
          className={`transition-all duration-300 ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }`}
        >
          {facilityData?.data?.map((facility: FacilitiesDataType) =>
            viewMode === "grid" ? (
              <FacilityCard key={facility._id} facility={facility} />
            ) : (
              <Card
                key={facility._id}
                shadow="sm"
                className="border border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <CardBody className="flex flex-col sm:flex-row gap-5 items-center">
                  <img
                    src={
                      facility.images?.[0] || "/assets/images/placeholder.jpg"
                    }
                    alt={facility.name}
                    className="w-full sm:w-1/3 h-44 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-left space-y-2">
                    <h3 className="font-semibold text-lg text-[#1B1F3B]">
                      {facility.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {facility.description}
                    </p>
                    <p className="mt-2 font-medium text-[#1B1F3B]">
                      Price: {facility?.pricePerHour} ৳
                    </p>
                  </div>
                </CardBody>
              </Card>
            )
          )}
        </div>
      </HandleDataLoading>
    </section>
  );
};

export default Facilities;
