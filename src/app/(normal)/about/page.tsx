import {
  Card,
  Col,
  Row,
  Timeline,
  Descriptions,
  Divider,
  Button,
  Space,
  Image,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import HeaderSportyfy from "@/components/Shared/HeaderSportyfy/HeaderSportyfy"; 
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import Meta from "antd/es/card/Meta";


const AboutUs = () => {
  return (
    <div className="md:max-w-7xl mx-auto pt-20">
      <div className="mx-4 ">
        <HeaderSportyfy text={"about us"} />
      </div>
      <div className="mx-4" style={{  backgroundColor: "#f9f9f9" }}>
        {/* Mission Statement */}
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center", marginBottom: "40px" }}>
            <Title level={2}>Our Mission</Title>
            <Paragraph
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                fontSize: "16px",
                color: "#595959",
              }}
            >
              We are dedicated to simplifying sports facility bookings. Our
              platform connects users with the best sports venues, ensuring a
              seamless experience for booking courts, fields, and other sports
              facilities at the time that works best for you.
            </Paragraph>
            <Divider />
          </Col>
        </Row>

        {/* Team Section */}
        <Row gutter={[16, 16]} justify="center">
          <Col span={24} style={{ textAlign: "center", marginBottom: "30px" }}>
            <h3
              className="text-xl md:text-3xl font-bold mb-10"
              style={{ color: "#1B1F3B" }}
            >
              Meet Our Team
            </h3>
            <Paragraph
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                fontSize: "16px",
                color: "#595959",
              }}
            >
              Our team consists of passionate individuals who are committed to
              providing the best experience for sports enthusiasts everywhere.
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <Image

                  alt="Team Member 1"
                  src="https://xsgames.co/randomusers/avatar.php?g=female"
                />
              }
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <Meta
                title={<Text strong>John Doe</Text>}
                description={<Text type="secondary">CEO & Founder</Text>}
              />
              <Paragraph style={{ marginTop: "10px", color: "#595959" }}>
                John is passionate about sports and technology, and he founded
                this platform to make booking sports facilities more accessible
                for everyone.
              </Paragraph>
              <Space>
                <Button
                  className="text-white"
                  shape="circle"
                  icon={<LinkedinOutlined />}
                />
                <Button
                  className="text-white"
                  shape="circle"
                  icon={<TwitterOutlined />}
                />
                <Button
                  className="text-white"
                  shape="circle"
                  icon={<GithubOutlined />}
                />
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <Image
                  alt="Team Member 2"
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                />
              }
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <Meta
                title={<Text strong>Jane Smith</Text>}
                description={<Text type="secondary">CTO</Text>}
              />
              <Paragraph style={{ marginTop: "10px", color: "#595959" }}>
                Jane leads our tech team, ensuring the platform runs smoothly
                and delivers a user-friendly experience for everyone.
              </Paragraph>
              <Space>
                <Button
                  shape="circle"
                  icon={<LinkedinOutlined className="text-white" />}
                />
                <Button
                  className="text-white"
                  shape="circle"
                  icon={<TwitterOutlined />}
                />
                <Button
                  className="text-white"
                  shape="circle"
                  icon={<GithubOutlined />}
                />
              </Space>
            </Card>
          </Col>
        </Row>

        {/* History & Milestones */}
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col span={24} style={{ textAlign: "center", marginBottom: "30px" }}>
            <h3
              className="text-xl md:text-3xl font-bold"
              style={{ color: "#1B1F3B" }}
            >
              Our Journey
            </h3>
          </Col>
          <Col span={24} style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Timeline mode="alternate">
              <Timeline.Item label="2019" color="green">
                <div className="bg-[#1B1F3B] text-white p-6 rounded-xl">
                  <Text className="text-white" strong>
                    Idea Conceived
                  </Text>{" "}
                  - During a local sports event, the vision for a seamless
                  sports facility booking platform was born.
                </div>
              </Timeline.Item>
              <Timeline.Item label="2020" color="blue">
                <div className="bg-[#1B1F3B] text-white p-6 rounded-xl">
                  <Text className="text-white" strong>
                    Platform Launch
                  </Text>{" "}
                  - We officially launched with over 50+ sports facilities
                  listed.
                </div>
              </Timeline.Item>
              <Timeline.Item label="2021" color="blue">
                <div className="bg-[#1B1F3B] text-white p-6 rounded-xl">
                  <Text className="text-white" strong>
                    Major Expansion
                  </Text>{" "}
                  - Expanded to 100+ facilities across multiple cities with new
                  sports categories added.
                </div>
              </Timeline.Item>
              <Timeline.Item label="2022" color="purple">
                <div className="bg-[#1B1F3B] text-white p-6 rounded-xl">
                  <Text className="text-white" strong>
                    Mobile App Release
                  </Text>{" "}
                  - Introduced a mobile app with enhanced booking features and
                  notifications.
                </div>
              </Timeline.Item>
              <Timeline.Item label="2023" color="green">
                <div className="bg-[#1B1F3B] text-white p-6 rounded-xl">
                  <Text className="text-white" strong>
                    Milestone
                  </Text>{" "}
                  - Reached 10,000+ active users and partnered with over 500
                  sports venues across the country.
                </div>
              </Timeline.Item>
            </Timeline>
          </Col>
        </Row>

        {/* Contact Information */}
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
            <Title level={2}>Contact Us</Title>
          </Col>
          <Col span={24} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item
                label={<EnvironmentOutlined style={{ color: "#1B1F3B" }} />}
              >
                123 Sports Ave, Sport City
              </Descriptions.Item>
              <Descriptions.Item
                label={<PhoneOutlined style={{ color: "#1B1F3B" }} />}
              >
                +123 456 7890
              </Descriptions.Item>
              <Descriptions.Item
                label={<MailOutlined style={{ color: "#1B1F3B" }} />}
              >
                support@sportbooker.com
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutUs;
