import { Button, DatePicker, Form, Divider, message, Spin } from "antd";
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
import HandleDataLoading from "../components/ui/Shared/HandleDataLoading/HandleDataLoading";
import dayjs from "dayjs";

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
  const [checkingDate, setCheckingDate] = useState<string | "">("");
  const [selectedSlot, setSelectedSlot] = useState({
    startTime: "",
    endTime: "",
  });

  //   availability for the checking
  const { data: availability, isFetching : isAvailabilityFetching , isLoading: isAvailabilityLoading, refetch: refetchAvailability } =
    useCheckAvailabilityQuery({
      facilityId: id as string,
      date: checkingDate,
    });
 
  const [createBooking] = useCreateBookingMutation();

  

  const handleSubmit = async () => {

    if(selectedSlot.startTime === "" || selectedSlot.endTime  === ""){
      messageApi
      .open({
        type: "error",
        content: "Select a slot",
      })
    }else{


      const bookingData = {
        ...selectedSlot,
        date: checkingDate,
        user: userData.data._id,
        facility: id,
        payableAmount: Number(facility.data.pricePerHour) * 2,
      };
      const result = await createBooking(bookingData as TBooking);
  
      if (result?.data?.success) {
        
            messageApi
              .open({
                type: "loading",
                content: "Redirecting to the payment page",
              })
              .then(() => {
                window.location.href = result.data.data.paymentSession;
              });
          
          refetchAvailability();
         
      } else {
        const error = result.error as FetchBaseQueryError;
        messageApi.open({
          type: "error",
          content: (error.data as ErrorResponse)?.message,
        });
      }
      console.log(result);
    }


  };

  return (
    <div style={{ padding: "20px" }} className="mx-10 my-10">
      {contextHolder}

      <HandleDataLoading isLoading={isLoading} data={facility?.data}>
        <div>
          {/* Facility Overview */}
          <div
            className="hero bg-[#1B1F3B]  text-white rounded-xl mb-10"
            style={{
              backgroundImage: `url(${facility?.data?.image})`,
            }}
          >
            <div className="hero-overlay bg-opacity-90 rounded-lg"></div>
            <div className="w-full p-4">
              <div className="" style={{ marginBottom: "40px" }}>
                <h2 className="text-white text-center font-bold">
                  {facility?.data?.name}
                </h2>
                <Divider />
                <p className="mb-4">{facility?.data?.description}</p>
                <p>
                  <strong>Price Per Hour:</strong>{" "}
                  {facility?.data?.pricePerHour} &#2547;
                </p>
                <p>
                  <strong>Location:</strong> {facility?.data?.location}
                </p>
              </div>
            </div>
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
                  minDate={dayjs().startOf("day")}
                  style={{ width: "100%" }}
                  onChange={(date) => {
                    setCheckingDate(date ? date.format("YYYY-MM-DD") : "");
                  }}
                />
              </Form.Item>
            </Form>

            {/* Available Slots Display */}
            {checkingDate !== "" && !isAvailabilityFetching && availability?.data?.length > 0 && (
              <div className="available-slots mt-5">
                <h3 className="font-bold text-xl text-center mb-4">Select Time Slots</h3>
                {(isAvailabilityLoading || isAvailabilityFetching) ? (
                  <div className="flex justify-center">
                    <Spin size="large" />
                  </div>
                ) : (
                  <ul className="flex gap-4 flex-wrap justify-center">
                    {availability?.data?.map((slot: TSlot, index: number) => (
                      <li
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`cursor-pointer transition-colors duration-200 my-1 rounded-md py-2 px-4 text-white
                          ${selectedSlot === slot ? 'bg-[#1B1F3B]' : 'bg-slate-700 hover:bg-slate-600'}`}
                      >
                        <p className={`flex items-center gap-2 py-2 ${selectedSlot === slot ? 'border-b' : ''}`}>
                          <ClockCircleOutlined />
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>


          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#1B1F3B", padding: "20px" }}
            >
              Complete Booking
            </Button>
          </div>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default Booking;
