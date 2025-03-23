import Title from "antd/es/typography/Title";
import { useGetFacilitiesQuery } from "../../../../redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import HandleDataLoading from "../../Shared/HandleDataLoading/HandleDataLoading";
import { Link } from "react-router-dom";
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
          <Title level={2} style={{ color: "#1B1F3B", marginBottom: "50px" }}>
            Featured Facilities
          </Title>
          <div className="grid grid-cols-4 gap-4">
            {facilities?.data
              ?.slice(0, 4)
              .map((facility: FacilitiesDataType) => (
                <Link to={`/facility/${facility._id}`}>
                  <FacilityCard facility={facility} />
                </Link>
              ))}
          </div>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default FeaturedFacilities;
