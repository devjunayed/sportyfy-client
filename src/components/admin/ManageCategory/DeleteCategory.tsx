/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { useState } from "react";
import { useDeleteCategoryMutation } from "../../../redux/api/dashboard/categoryApi";
import { CategoryDataType } from "../../../types/category.type";

interface DeleteCategoryProps {
  data: CategoryDataType;
  refetch: () => Promise<any>;
}

const DeleteCategory = ({ data, refetch }: DeleteCategoryProps) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showPopconfirm = () => {
    setOpen(true); // only opens the confirm box, no need to close it with a timer
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const result = await deleteCategory(data._id).unwrap();

      if (result?.success) {
        await refetch(); // ensure it's awaited
        messageApi.success("Deleted successfully!");
      } else {
        messageApi.error("Failed to delete category.");
      }
    } catch (error: any) {
      messageApi.error(error?.data?.message || "Delete failed");
    } finally {
      setConfirmLoading(false);
      setOpen(false); // close only after mutation
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title={`Delete ${data.title}`}
      description="This action cannot be undone"
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        loading: confirmLoading,
        style: {
          backgroundColor: "black",
          borderColor: "black",
          color: "#fff",
        },
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: "black",
          borderColor: "black",
          color: "#fff",
        },
      }}
    >
      {contextHolder}
      <a onClick={showPopconfirm}>
        <DeleteOutlined />
      </a>
    </Popconfirm>
  );
};


export default DeleteCategory;
