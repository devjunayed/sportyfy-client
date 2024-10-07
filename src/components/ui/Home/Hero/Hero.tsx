import { Button, Input, Modal } from "antd";
import { useCheckAvailabilityQuery } from "../../../../redux/api/checkavailabilty/checkavailabiltyApi";
import { useState } from "react";
import heroImg from '../../../../assets/images/hero-img.jpg'

const Hero = () => {
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: availability,
    isLoading,
    isFetching,
    error,
  } = useCheckAvailabilityQuery(date);
  const handleInputChange = async (values: string) => {
    setDate(values);
    console.log(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="hero min-h-[80vh]"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <Modal
        okButtonProps={{ style: { backgroundColor: "black" } }}
        title={`Slots for ${date}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="my-10">
          {(isLoading || isFetching) && (
            <div className="text-center ">Loading...</div>
          )}
          <div className="grid grid-cols-2 items-center justify-center">
            {!isLoading &&
              !isFetching &&
              !error &&
              availability?.data?.length > 0 &&
              availability?.data?.map(
                (
                  slot: { startTime: string; endTime: string },
                  index: number
                ) => (
                  <p
                    className=" mt-2 text-lg font-semibold text-center"
                    key={index}
                  >
                    {slot.startTime} - {slot.endTime} ⌛
                  </p>
                )
              )}
          </div>
          {error && (
            <div className="text-center text-xl text-red-600">
              No slots available
            </div>
          )}
        </div>
      </Modal>
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="  text-white">
        <div className=" sm:px-20 md:px-28 lg:px-48">
          <h1 className="mb-5 text-2xl text-center text-white lg:text-5xl font-bold">
            Your Game. Your Time. Your Court.
          </h1>
          <p className="mb-5 text-center mx-4">
            Explore the best sports facilities in your area and book instantly.
            Whether it's soccer, tennis, or basketball, we’ve got you covered.
          </p>
        </div>
        <div className="text-xl px-10 sm:px-32 md:px-56 lg:px-96">
          <Input
            name="date"
            onChange={(e) => handleInputChange(e.target.value)}
            type="date"
            className="mb-5 "
          />
          <div className="flex gap-4 justify-center text-xl">
            <Button className="text-white text-md hover:bg-gray-800 ">
              Book Now
            </Button>
            <Button
              onClick={showModal}
              className="text-white text-md hover:bg-gray-800"
            >
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
