import { Card, Image, Button, Typography, Space } from "antd";
import { FacilitiesDataType } from "../../../pages/admin/ManageFacility";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const FacilityCard = (productData: FacilitiesDataType) => {

  const { _id, name, image, description, pricePerHour, location } = productData;



  return (
    <Card
      hoverable
      cover={<Image height={200} src={image} alt={name} />}
      style={{
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        minHeight: 400, 
        display: "flex",
        width: "250px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ textAlign: "center", padding: "10px" }}>
        <Title level={4} style={{ color: "#1B1F3B" }}>
          {name}
        </Title>
        <Paragraph
          ellipsis={{ rows: 3 }} 
          style={{ color: "#595959", minHeight: 60 }} 
        >
          {description}
        </Paragraph>
        <Text>Location: {location}</Text>
        <Paragraph strong style={{ fontSize: "18px", color: "#1B1F3B" }}>
          {pricePerHour} <span style={{ fontWeight: "bold" }}>&#2547;</span> / hour
        </Paragraph>
      </div>
      <div style={{ textAlign: "center", marginTop: "auto", paddingBottom: "10px" }}>
        <Space size="middle">
          <Button type="primary">
            <Link to={`/facility/${_id}`}>View Details</Link>
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default FacilityCard;
