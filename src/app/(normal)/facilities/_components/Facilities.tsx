"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Input, Select, Pagination, Slider } from "antd";
import { useEffect, useState } from "react";
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "@/types/facility.type";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import FacilityCard from "../../_components/FeaturedFacilities/FacilityCard";

const Facilities = () => {
  const [queryUrl, setQueryUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { Search } = Input;
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const {
    data: facilityData,
    refetch: refetchFacilities,
    isLoading,
  } = useGetFacilitiesQuery(queryUrl);

  const totalCount = facilityData?.length || 0;

  const updateQueryUrl = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("minPrice", priceRange[0].toString());
    queryParams.append("maxPrice", priceRange[1].toString());
    queryParams.append("page", (currentPage - 1).toString());
    queryParams.append("limit", limit.toString());

    const newQuery = queryParams.toString();
    setQueryUrl(newQuery);
  };

  const onSearch = (value: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append("search", value);
    queryParams.append("page", (currentPage - 1).toString());
    queryParams.append("limit", limit.toString());
    setQueryUrl(queryParams.toString());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  useEffect(() => {
    updateQueryUrl();
  }, [currentPage, limit, handlePriceRangeChange]);

  useEffect(() => {
    if (queryUrl) {
      refetchFacilities();
    }
  }, [queryUrl, refetchFacilities]);

  const perPageOptions = [5, 10, 20, 50];


  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="m-10 pt-28">
      <div className="w-2/3 md:w-1/2 mx-auto mb-10">
        <Search
          placeholder="input search text"
          allowClear={true}
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="mb-4  ">
        <div className=" w-5/12 mx-auto items-center gap-4 justify-center   flex">
          <div className="text-base">Price Range:</div>
          <div className="flex items-center  gap-2 w-[400px]">
            <span>{priceRange[0]} &#2547;</span>
            <Slider
              className="w-6/12 "
              range
              defaultValue={priceRange}
              min={0}
              max={5000}
              onChange={handlePriceRangeChange}
              styles={{
                rail: { backgroundColor: "gray" }, // Unfilled track color
                track: { backgroundColor: "black" }, // Filled track color
                handle: {
                  borderRadius: "20px",
                  borderColor: "black",
                  backgroundColor: "black",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                },
              }}
            />

            <span>{priceRange[1]} &#2547;</span>
          </div>
        </div>
        <div className="mx-auto w-full">
          <HandleDataLoading
            isLoading={isLoading}
            data={facilityData?.data}
            message="No Facility Found!"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 bg-white pl-4 pt-4">
              {facilityData?.data?.map((facility: FacilitiesDataType) => (
                <div className="mx-auto" key={facility._id}>
                  <FacilityCard facility={facility} />
                </div>
              ))}
            </div>
          </HandleDataLoading>

          <Flex
            justify="center"
            align="middle"
            className="flex-wrap gap-4 mb-4"
          >
            <Pagination
              current={currentPage}
              pageSize={limit}
              total={totalCount}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
            <Select
              defaultValue={limit}
              onChange={handleLimitChange}
              style={{ width: "120px" }}
            >
              {perPageOptions.map((option) => (
                <Select.Option key={option} value={option}>
                  {option} per page
                </Select.Option>
              ))}
            </Select>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Facilities;


