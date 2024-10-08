import {
  Button,
  DatePicker,
  Form,
  Select,
  Spin,
  Divider,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleFacilityQuery } from "../redux/api/dashboard/facilityApi";
import { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useCheckAvailabilityQuery } from "../redux/api/checkavailabilty/checkavailabiltyApi";
import { useGetUserQuery } from "../redux/api/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/authSlice";
import { ErrorResponse, TBooking, TUser } from "../types/shared.type";
import { useCreateBookingMutation } from "../redux/api/booking/bookingApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface TSlot {
  startTime: string;
  endTime: string;
}

const Booking = () => {
  const { id } = useParams();
  const user = useAppSelector(currentUser);
  const { data: userData } = useGetUserQuery(
    user ? `${(user as TUser).email}` : ""
  );
  const { data: facility, isLoading } = useGetSingleFacilityQuery(id as string);

  const [messageApi, contextHolder] = message.useMessage();
  const [selectedDate, setSelectedDate] = useState<string | "">("");
  const [checkingDate, setCheckingDate] = useState<string | "">("");
  const [submittingDate, setSubmittingDate] = useState<string | "">("");
  const [selectedSlot, setSelectedSlot] = useState({
    startTime: "",
    endTime: "",
  });

  //   availability for the checking
  const { data: availability, refetch: refetchAvailability } =
    useCheckAvailabilityQuery({
      facilityId: id as string,
      date: checkingDate,
    });
  //   availability for the submitting
  const { data: slots, refetch: refetchSlots } = useCheckAvailabilityQuery({
    facilityId: id as string,
    date: submittingDate,
  });

  const [createBooking] = useCreateBookingMutation();

  // Mock function to simulate availability check
  const checkAvailability = () => {
    setCheckingDate(() => selectedDate);
    refetchAvailability();
  };

  const handleSlotChange = (value: string) => {
    const [startTime, endTime] = value.split("-");
    setSelectedSlot({ startTime, endTime });
  };

  const handleSubmit = async () => {
    const bookingData = {
      ...selectedSlot,
      date: submittingDate,
      user: userData.data._id,
      facility: id,
      payableAmount: Number(facility.data.pricePerHour) * 2
    };
    const result = await createBooking(bookingData as TBooking);
    console.log(result);

    if(result?.data?.success){
        messageApi.open({
            type: "success",
            content: result.data.message
        })
        refetchSlots();
    }else{
        const error = result.error as FetchBaseQueryError;
        messageApi.open({
            type: "error",
            content: (error.data as ErrorResponse)?.message
        })
    }
    console.log(result);
  };

  return (
    <div style={{ padding: "20px" }} className="mx-10 my-10">
        {contextHolder}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div>
          {/* Facility Overview */}
          <div
            className="bg-[#1B1F3B] p-4 text-white rounded-xl"
            style={{ marginBottom: "40px" }}
          >
            <h2 className="text-white text-center font-bold">
              {facility?.data?.name}
            </h2>
            <Divider />
            <p className="mb-4">{facility?.data?.description}</p>
            <p>
              <strong>Price Per Hour:</strong> {facility?.data?.pricePerHour}{" "}
              &#2547;
            </p>
            <p>
              <strong>Location:</strong> {facility?.data?.location}
            </p>
          </div>

          {/* Availability Checker */}
          <div
            className="availability-checker w-full"
            style={{ marginBottom: "40px" }}
          >
            <Form
              className="flex  justify-center items-center gap-10"
              layout="vertical"
            >
              <Form.Item label="Select Booking Date" className="w-1/2" required>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(date) =>
                    setSelectedDate(date ? date.format("YYYY-MM-DD") : "")
                  }
                />
              </Form.Item>

              <Button
                className="text-white"
                onClick={checkAvailability}
                disabled={!selectedDate}
                loading={isLoading}
                style={{ backgroundColor: "#1B1F3B", color: "white" }}
              >
                Check Availability
              </Button>
            </Form>

            {/* Available Slots Display */}
            {checkingDate !== "" && availability?.data?.length > 0 && (
              <div className="available-slots" style={{ marginTop: "20px" }}>
                <h3 className="font-bold text-xl text-center mb-4">
                  Available Time Slots
                </h3>
                <ul className="flex gap-4 justify-center">
                  {availability?.data?.map((slot: TSlot, index: number) => (
                    <li
                      className="bg-[#1B1F3B] my-1 rounded-md p-4 text-white"
                      key={index}
                    >
                      <ClockCircleOutlined /> {slot.startTime} - {slot.endTime}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Divider />
          {/* Booking Form */}
          <div
            className="booking-form lg:mx-56"
            style={{ marginBottom: "40px" }}
          >
            <h1 className="text-center mb-6 text-3xl font-semibold">
              Book Facility
            </h1>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Select Booking Date" className="" required>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(date) => {
                    setSubmittingDate(date ? date.format("YYYY-MM-DD") : "");
                    refetchSlots();
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Slots"
                name="slots"
                rules={[{ required: true, message: "Please select a slot!" }]}
              >
                <Select placeholder="Select a slot" onChange={handleSlotChange}>
                  {slots?.data?.map((slot: TSlot) => (
                    <Select.Option
                      value={`${slot.startTime}-${slot.endTime}`}
                      key={slot.startTime}
                    >
                      {slot.startTime} - {slot.endTime}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#1B1F3B" }}
              >
                Complete Booking
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
