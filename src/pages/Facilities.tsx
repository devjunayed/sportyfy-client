/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Input, Select, Pagination, Slider } from "antd";
import { useEffect, useState } from "react";
import { useGetFacilitiesQuery } from "../redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "./admin/ManageFacility";
import FacilityCard from "../components/ui/Facilities/FacilityCard";

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
    isFetching,
  } = useGetFacilitiesQuery(queryUrl);

  const facility = facilityData?.data || [];
  const totalCount = facilityData?.length || 0;

  const updateQueryUrl = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("minPrice", priceRange[0].toString())
    queryParams.append("maxPrice", priceRange[1].toString())
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

  return (
    <div className="m-10">
      <div className="w-2/3 md:w-1/2 mx-auto mb-10">
        <Search
          placeholder="input search text"
          allowClear={true}
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="mb-4 lg:flex gap-4">
        <div className="mt-6">
          <div className="text-lg mb-2">Price Range:</div>
          <Slider
            range
            defaultValue={priceRange}
            min={0}
            max={5000}
            onChange={handlePriceRangeChange}
          />
          <div className="flex justify-between mt-2">
            <span>{priceRange[0]} &#2547;</span>
            <span>{priceRange[1]} &#2547;</span>
          </div>
        </div>
        <div className="mx-auto">
          {(isLoading || isFetching) && (
            <div className="text-center  text-green my-10">Loading...</div>
          )}

          {(!isLoading || !isFetching) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 bg-white pl-4 pt-4">
              {facilityData?.data?.map((facility: FacilitiesDataType) => (
                <div className="mx-auto" key={facility._id}>
                  <FacilityCard {...facility} />
                </div>
              ))}
            </div>
          )}
          {!isLoading && facility.length === 0 && (
            <div className="text-center text-green text-3xl font-bold bg-white py-24">
              No Data found
            </div>
          )}
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
