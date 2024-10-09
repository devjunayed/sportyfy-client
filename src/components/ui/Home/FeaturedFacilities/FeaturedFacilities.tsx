import { Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useGetFacilitiesQuery } from "../../../../redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import HandleDataLoading from "../../Shared/HandleDataLoading/HandleDataLoading";

const FeaturedFacilities = () => {
  const { data: facilities, isLoading } = useGetFacilitiesQuery("");

  return (
    <div
      style={{ padding: "50px", backgroundColor: "white", textAlign: "center" }}
    >
      <HandleDataLoading
       noDataOnError={true}
        isLoading={isLoading}
        data={facilities?.data}
      >
        <div>
          <Title level={2} style={{ color: "#1B1F3B", marginBottom: "50px" }}>
            Featured Facilities
          </Title>
          <Row gutter={[16, 16]} justify="center">
            {facilities?.data
              ?.slice(0, 5)
              .map((facility: FacilitiesDataType) => (
                <Col key={facility._id} xs={24} sm={12} md={8}>
                  <Card
                    cover={
                      <img
                        className="size-64"
                        alt="facility-1"
                        src={facility.image}
                      />
                    }
                    hoverable
                  >
                    <Card.Meta
                      title={facility.name}
                      description={facility.description}
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default FeaturedFacilities;
