/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";

import { useState } from "react";
import { FacilitiesDataType } from "../../../pages/admin/ManageFacility";
import { useDeleteFacilityMutation } from "../../../redux/api/dashboard/facilityApi";

interface DeleteFacilitiesProps {
  data: FacilitiesDataType;
  refetch: () => Promise<any>;
}

const DeleteFacilities = ({ data, refetch }: DeleteFacilitiesProps) => {
  const [deleteFacility] = useDeleteFacilityMutation();
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

    const result = await deleteFacility(data._id);

    if (result.data.success) {
      messageApi
        .open({
          type: "success",
          content: "Deleted successfully!",
        })
        .then(() => {
          refetch();
        });
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Popconfirm
      title={`Delete ${data.name}`}
      description="The action can not be undone"
      open={open}
      onConfirm={handleOk}
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
      <a onClick={showPopconfirm}>
        <DeleteOutlined />
      </a>
    </Popconfirm>
  );
};

export default DeleteFacilities;
