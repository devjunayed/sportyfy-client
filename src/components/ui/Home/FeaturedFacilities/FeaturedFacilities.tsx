import { Card } from "antd";
import Title from "antd/es/typography/Title";
import { useGetFacilitiesQuery } from "../../../../redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import HandleDataLoading from "../../Shared/HandleDataLoading/HandleDataLoading";
import { Link } from "react-router-dom";

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
                  <Card
                    key={facility._id}
                    cover={
                      <img
                        className="size-64"
                        alt="facility-1"
                        src={facility.image}
                      />
                    }
                    hoverable
                  >
                    <Card.Meta title={facility.name} />
                    <div className="flex justify-center">
                      <button className=" w-1/2 mt-4 border bg-gray-800 text-white py-1 rounded-md text-center">
                        Book Now
                      </button>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default FeaturedFacilities;
