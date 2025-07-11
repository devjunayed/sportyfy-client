import { Card, Carousel, Image, Typography } from "antd";

const { Title, Text } = Typography;

const Testimonials = () => {
  return (
    <div
    className="max-w-7xl mx-auto"
      style={{ padding: "50px", backgroundColor: "white", textAlign: "center" }}
    >
      <Title level={2} style={{ color: "#1B1F3B" }}>
        What Our Customers Say
      </Title>
      <Carousel autoplay>
        <div>
          <Card hoverable>
            <div className="flex justify-center items-center  flex-col">
              <Image
              preview={false}
                className="mx-auto rounded-full mb-4"
                width={150}
                src="https://xsgames.co/randomusers/avatar.php?g=male"
              />
              <Text>
                "I had a great experience booking a football field. The process
                was quick and seamless!"
              </Text>
              <Text strong>- John Doe</Text>
            </div>
          </Card>
        </div>
        <div>
          <Card hoverable>
          <div className="flex justify-center items-center  flex-col">
              <Image
              preview={false}
                className="mx-auto rounded-full mb-4"
                width={150}
                src="https://xsgames.co/randomusers/avatar.php?g=female"
              />
            <Text>
              "Easy to use and hassle-free booking system. I highly recommend
              this platform."
            </Text>
            <Text strong>- Jenny Smith</Text>
            </div>
          </Card>
        </div>
        <div>
          <Card hoverable>
          <div className="flex justify-center items-center  flex-col">
              <Image
              preview={false}
                className="mx-auto rounded-full mb-4"
                width={150}
                src="https://xsgames.co/randomusers/avatar.php?g=male"
              />
            <Text>
              "I love how I can compare different venues and book the best one
              with just a few clicks!"
            </Text>
            <Text strong>- Mike Johnson</Text>
            </div>
          </Card>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
