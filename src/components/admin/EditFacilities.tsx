/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal } from "antd";
import { FacilitiesDataType } from "../../pages/admin/ManageFacility";
import { useUpdateFacilityMutation } from "../../redux/api/dashboard/facilityApi";

interface EditFacilitiesProps {
  data: FacilitiesDataType;
  refetch: () => Promise<any>;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditFacilities = ({ data, refetch }: EditFacilitiesProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateFacility, { isLoading }] = useUpdateFacilityMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const onReset = () => {
    form.resetFields();
  };

  // Open modal
  const showModal = () => {
    // setting old value to the form
    form.setFieldsValue({
      name: data.name,
      description: data.description,
      pricePerHour: data.pricePerHour,
      location: data.location,
    });

    // opening modal
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  const handleOk = async (values: any) => {
    try {
      const facilityData = {
        name: values.name,
        description: values.description,
        location: values.location,
        pricePerHour: Number(values.pricePerHour),
      };

      // Sending updated data to the server
      const id = data._id;
      const response = await updateFacility({ id, facilityData });

      console.log("Backend response:", response); // Debugging network response

      if (response?.data?.success) {
        messageApi.open({
          type: "success",
          content: "Facility successfully updated",
        });
        refetch();
        setIsModalVisible(false);
      } else {
        messageApi.open({
          type: "error",
          content: response?.data?.message || "Error updating facility",
        });
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      messageApi.open({
        type: "error",
        content: "Error updating facility!",
      });
    }
  };

  return (
    <>
      <a onClick={showModal}>
        <EditOutlined /> Edit
      </a>
      <div className="w-full mx-auto">
        {contextHolder}
        <Form
          {...layout}
          form={form}
          onFinish={handleOk} // Form submit handler
          name="control-hooks"
          style={{ maxWidth: 600 }}
        >
          <Modal
            title="Edit Category"
            open={isModalVisible}
            onOk={() => form.submit()} // Trigger form submit
            confirmLoading={isLoading}
            onCancel={handleCancel}
            okText="Save"
            cancelText="Cancel"
            footer={[
              <Button key="reset" onClick={onReset}>
                Reset
              </Button>,
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isLoading}
                onClick={() => form.submit()} // Use form.submit() to trigger onFinish
              >
                Save
              </Button>,
            ]}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="pricePerHour"
              label="Price Per Hour"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Modal>
        </Form>
      </div>
    </>
  );
};

export default EditFacilities;
