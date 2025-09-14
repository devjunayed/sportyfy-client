"use client"
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import JoditEditor from "jodit-react";

import { useDispatch } from "react-redux";
import {
  setName,
  setDescription,
  setShortDescription,
  setLocation,
  setPricePerHour,
  setCategory,
  setCapacity,
  setOpenHours,
  setHighlight,
} from "@/redux/features/facilitiySlice";
import { useAppSelector } from "@/redux/hooks";
import FileUpload from "@/components/Shared/FileUpload/FileUpload";
import { useUpdateFacilityMutation } from "@/redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "../page";

interface EditFacilityProps {
  data: FacilitiesDataType;
  refetch: () => Promise<any>;
}

const EditFacility = ({ data, refetch }: EditFacilityProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [updateFacility, { isLoading }] = useUpdateFacilityMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<string[]>(data.images || []);
  const [resetKey, setResetKey] = useState(`${Date.now().toString()}`);

  const {
    name,
    description,
    shortDescription,
    location,
    pricePerHour,
    category,
    capacity,
    openHours,
    highlight,
    isDeleted,
  } = useAppSelector((state) => state.facility);

  useEffect(() => {
    if (isModalVisible) {
      dispatch(setName(data.name));
      dispatch(setDescription(data.description));
      dispatch(setShortDescription(data.shortDescription));
      dispatch(setLocation(data.location));
      dispatch(setPricePerHour(data.pricePerHour));
      dispatch(setCategory(data.category));
      dispatch(setCapacity(data.capacity));
      dispatch(setOpenHours(data.openHours as unknown as string));
      dispatch(setHighlight(data.highlight));
      setImages(data.images || []);
    }
  }, [isModalVisible]);

  const showModal = () => {
    form.setFieldsValue({
      images: data.images,
      shortDescription: data.shortDescription,
      category: data.category,
      capacity: data.capacity,
      openHours: data.openHours,
      highlight: data.highlight,
      name: data.name,
      description: data.description,
      pricePerHour: data.pricePerHour,
      location: data.location,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFileUpload = (imageUrls: string[]) => {
    setImages([...imageUrls]);
  };

  const onFinish = async () => {
    const facilityData = {
      name,
      description,
      shortDescription,
      location,
      pricePerHour,
      images,
      category,
      capacity,
      openHours,
      highlight,
      isDeleted,
    };

    const response = await updateFacility({ id: data._id, facilityData });

    if (response.data?.success) {
      messageApi.success(response.data.message);
      refetch();
      setIsModalVisible(false);
      setResetKey(`${Date.now().toString()}`);
    } else {
      messageApi.error(response.data?.message || "Update failed.");
    }
  };

  return (
    <div className="w-full">
      <a onClick={showModal}>
        <EditOutlined />
      </a>

      <Modal
        width={820}
        title="Edit Facility"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" className="text-white" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={() => form.submit()}
          >
            Save
          </Button>,
        ]}
      >
        {contextHolder}
        <Form
          layout="vertical"
          form={form}
          className="w-full"
          onFinish={onFinish}
        >
          <div className="mb-6 mx-auto w-full flex justify-center">
            <FileUpload
              initialFileUrls={images}
              maxUpload={10}
              resetKey={resetKey}
              imgbbUrl={`https://api.imgbb.com/1/upload?key=${
                process.env.NEXT_IMGBB_API_KEY
              }`}
              handleFileUpload={handleFileUpload}
            />
          </div>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input
              defaultValue={name}
              onChange={(e) => dispatch(setName(e.target.value))}
            />
          </Form.Item>

          <Form.Item label="Short Description" name="shortDescription">
            <Input
              onChange={(e) => dispatch(setShortDescription(e.target.value))}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <JoditEditor
              value={description}
              onChange={(newContent) => dispatch(setDescription(newContent))}
            />
          </Form.Item>

          <Form.Item label="Price Per Hour" name="pricePerHour">
            <InputNumber
              className="w-full"
              onChange={(value) => dispatch(setPricePerHour(Number(value)))}
            />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input onChange={(e) => dispatch(setLocation(e.target.value))} />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Input onChange={(e) => dispatch(setCategory(e.target.value))} />
          </Form.Item>

          <Form.Item label="Capacity" name="capacity" className="w-full">
            <InputNumber
              className="w-full"
              min={1}
              onChange={(value) =>
                dispatch(setCapacity(value ?? data.capacity))
              }
            />
          </Form.Item>

          <Form.Item label="Open Hours" name="openHours">
            <Input onChange={(e) => dispatch(setOpenHours(e.target.value))} />
          </Form.Item>

          <Form.Item label="Highlight" name="highlight">
            <Input onChange={(e) => dispatch(setHighlight(e.target.value))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditFacility;
