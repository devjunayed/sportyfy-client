"use client";



import HeaderSportyfy from "@/components/Shared/HeaderSportyfy/HeaderSportyfy"; 



const ContactUs = () => {
  const onFinish = () => {
  };
  return (
    <div className="pt-20 md:max-w-7xl mx-auto ">
      <div className="mx-2">

      <HeaderSportyfy text="Contact us" />
      </div>
      <div
      className="mx-2"
        style={{ backgroundColor: "white", color: "#1B1F3B" }}
      >
        {/* Contact Us Title */}
       

        {/* Map Integration */}
        {/* <Row justify="center" style={{ marginTop: "50px" }}>
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
        </Row> */}
      </div>
    </div>
  );
};

export default ContactUs;
