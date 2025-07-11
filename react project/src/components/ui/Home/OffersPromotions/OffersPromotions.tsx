import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

const OffersPromotions = () => {
  return (
    <div
    className="max-w-7xl mx-auto"
      style={{
        padding: "50px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Title level={2} style={{ color: "#1B1F3B" }}>
        Exclusive Offers & Promotions
      </Title>
      <Paragraph>
        Don't miss out on our limited-time offers! Subscribe to our newsletter
        to stay updated on the latest promotions.
      </Paragraph>
      <Button
        type="primary"
        style={{ borderRadius: "5px", backgroundColor: "#1B1F3B" }}
      >
        Subscribe Now
      </Button>
    </div>
  );
};

export default OffersPromotions;
