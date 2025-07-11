/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Popconfirm } from "antd";

import { useState } from "react";
import { useCancelBookingMutation } from "../../redux/api/booking/bookingApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorResponse } from "../../types/shared.type";

interface CancelBookingProps {
  data: any;
  refetch: () => Promise<any>;
}

const CancelBooking = ({ data, refetch }: CancelBookingProps) => {
  const [cancelBooking] = useCancelBookingMutation();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showPopconfirm = () => {
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);

    const result = await cancelBooking(data._id);
    console.log(data._id);
    console.log(result)

    if (result?.data?.success) {
      messageApi
        .open({
          type: "success",
          content: "Canceled successfully!",
        })
        .then(() => {
          refetch();
        });
    }else{
      const error = result.error as FetchBaseQueryError
      messageApi
        .open({
          type: "error",
          content: (error.data as ErrorResponse).message,
        })
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Popconfirm
      title={`Cancel booking of ${data?.facility?.name}`}
      description="The action can not be undone"
      open={open}
      onConfirm={handleOk}
      cancelButtonProps={{
        style: {
          backgroundColor: "black",
          borderColor: "black",
          color: "#fff",
        },
      }}
      okButtonProps={{
        loading: confirmLoading, // Button loading state
        style: {
          backgroundColor: "black",
          borderColor: "black",
          color: "#fff",
        }, // Custom button styles
      }}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Button className="text-white" onClick={showPopconfirm}>
        Cancel
      </Button>
    </Popconfirm>
  );
};

export default CancelBooking;
