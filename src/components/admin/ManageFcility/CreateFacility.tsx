import { Form, Input, Button, InputNumber,  message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import JoditEditor from "jodit-react";
import { useCreateFacilityMutation } from "../../../redux/api/dashboard/facilityApi";
import { useAppSelector } from "../../../redux/hooks";
import FileUpload from "../../ui/Shared/FileUpload/FileUpload";
import {
  setDescription,
  setLocation,
  setName,
  setPricePerHour,
  setShortDescription,
  setCategory,
  setCapacity,
  setOpenHours,
  setHighlight,
} from "../../../redux/features/facilitiySlice";

const CreateFacility = () => {
  const [createFacility] = useCreateFacilityMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [images, setImages] = useState<string[]>([]);
  const dispatch = useDispatch();

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

  const [resetKey, setResetKey] = useState(`${Date.now().toString()}`);

  const [form] = Form.useForm();

  const onFinish = async () => {
    const response = await createFacility({
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
    });
    if (response.data.success) {
      messageApi.success(response.data.message);
      onReset();
      setImages([]);
      setResetKey(`${Date.now().toString()}`);
    } else {
      messageApi.error(response.data.message);
    }
  };

  // Reset form function
  const onReset = () => {
    form.resetFields();
  };

  const handleFileUpload = (imageUrls: string[]) => {
    setImages([...imageUrls]);
  };

  const config = {};

  return (
    <div className="flex justify-center items-center ">
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        className="w-full"
        onFinish={onFinish}
        initialValues={{
          name,
          shortDescription,
          description,
          pricePerHour,
          location,
          category,
          capacity,
          openHours,
          highlight,
          isDeleted,
        }}
      >
        <div className="mx-auto w-full mb-6 flex justify-center">
          <FileUpload
            initialFileUrls={images}
            maxUpload={10}
            resetKey={resetKey}
            imgbbUrl={`https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_API_KEY
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
            onChange={(e) => dispatch(setName(e.target.value))}
            value={name}
            placeholder="Enter name"
          />
        </Form.Item>

        <Form.Item
          label="Short Description"
          name="shortDescription"
          rules={[{ required: true, message: "Please enter a short description" }]}
        >
          <Input.TextArea
            onChange={(e) => dispatch(setShortDescription(e.target.value))}
            placeholder="Enter short description"
            value={shortDescription}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <JoditEditor
            config={config}
            value={description}
            onBlur={(content) => {
              dispatch(setDescription(content));
            }}
          />
        </Form.Item>

        <Form.Item
          label="Price per Hour"
          name="pricePerHour"
          rules={[{ required: true, message: "Please enter price per hour" }]}
        >
          <Input
            min={0}
            type="number"
            onChange={(e) => dispatch(setPricePerHour(Number(e.target.value)))}
            placeholder="Enter price per hour"
            value={pricePerHour}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter a location" }]}
        >
          <Input
            onChange={(e) => dispatch(setLocation(e.target.value))}
            placeholder="Enter location"
            value={location}
          />
        </Form.Item>

        {/* New Fields Start */}

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter category" }]}
        >
          <Input
            onChange={(e) => dispatch(setCategory(e.target.value))}
            value={category}
            placeholder="Enter category"
          />
        </Form.Item>

     

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: "Please enter capacity" }]}
        >
          <InputNumber
            min={1}
            value={capacity}
            onChange={(value) => dispatch(setCapacity(value ?? 1))}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Open Hours"
          name="openHours"
          rules={[{ required: true, message: "Please enter open hours" }]}
        >
           <Input
            onChange={(e) => dispatch(setOpenHours(e.target.value))}
            value={openHours}
            placeholder="Example: 08:00 AM - 10:00 PM"
          />
        </Form.Item>

        <Form.Item
          label="Highlight"
          name="highlight"
          rules={[{ required: true, message: "Please enter highlight" }]}
        >
          <Input
            onChange={(e) => dispatch(setHighlight(e.target.value))}
            value={highlight}
            placeholder="Highlight text"
          />
        </Form.Item>

   

        {/* New Fields End */}

        <div className="mx-auto">
          <Form.Item>
            <Button className="bg-black w-full mx-auto text-white" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateFacility;
