"use client";

import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  Descriptions,
  Divider,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import HeaderSportyfy from "@/components/Shared/HeaderSportyfy/HeaderSportyfy"; 
import Paragraph from "antd/es/typography/Paragraph";


const ContactUs = () => {
  const onFinish = () => {
  };
  return (
    <div className="mt-20 md:max-w-7xl mx-auto ">
      <div className="mx-2">

      <HeaderSportyfy text="Contact us" />
      </div>
      <div
      className="mx-2"
        style={{ backgroundColor: "white", color: "#1B1F3B" }}
      >
        {/* Contact Us Title */}
        <Row justify="center" style={{ marginBottom: "30px" }}>
          <Col span={24} style={{ textAlign: "center" }}>
        
            <Paragraph
              style={{ maxWidth: "800px", margin: "0 auto", color: "#595959" }}
            >
              We’re here to help! Fill out the form below or reach out to us
              directly.
            </Paragraph>
            <Divider />
          </Col>
        </Row>

        {/* Contact Form */}
        <Row justify="center">
          <Col xs={24} sm={18} md={12}>
            <Card
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Form
                name="contact_form"
                onFinish={onFinish}
                layout="vertical"
                style={{ color: "#1B1F3B" }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                  ]}
                >
                  <Input
                    placeholder="Your Name"
                    style={{ borderRadius: "4px" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    placeholder="Your Email"
                    style={{ borderRadius: "4px" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    { required: true, message: "Please enter a subject!" },
                  ]}
                >
                  <Input
                    placeholder="Subject"
                    style={{ borderRadius: "4px" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    { required: true, message: "Please enter your message!" },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Your Message"
                    style={{ borderRadius: "4px" }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "#1B1F3B",
                      borderColor: "#1B1F3B",
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Contact Details */}
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
            <h3  className="text-xl md:text-3xl font-bold" style={{ color: "#1B1F3B" }}>
              Contact Details
            </h3>
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

        {/* Map Integration */}
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col span={24} style={{ textAlign: "center", marginBottom: "30px" }}>
                <h3  className="text-xl md:text-3xl font-bold mb-10" style={{ color: "#1B1F3B" }}>
              Find Us
            </h3>
            <div className="w-full">

            <iframe
              className="w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1422244872447!2d90.42166437459386!3d23.81354107862736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356dee!2sJamuna%20Future%20Park!5e0!3m2!1sen!2sbd!4v1728321000395!5m2!1sen!2sbd"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
