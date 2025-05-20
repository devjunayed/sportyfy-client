import { Form, Input, Button, message } from "antd";
import {  useState } from "react";
import { useDispatch } from "react-redux";

import JoditEditor from "jodit-react";
import { useCreateFacilityMutation } from "../../../redux/api/dashboard/facilityApi";
import { useAppSelector } from "../../../redux/hooks";
import FileUpload from "../../ui/Shared/FileUpload/FileUpload";
import { setDescription, setLocation, setName, setPricePerHour, setShortDescription } from "../../../redux/features/facilitiySlice";

const CreateFacility = () => {

  const [createFacility] = useCreateFacilityMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [images, setImages] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { name, description, shortDescription, location, pricePerHour } = useAppSelector(
    (state) => state.facility
  );
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
    });
    if (response.data.success) {
      messageApi.success(response.data.message);
      onReset();
      setImages([])
      setResetKey(`${Date.now().toString()}`);
    } else {
      messageApi.error(response.data.message);
    }
  };

  // Reset form function
  const onReset = () => {
    form.resetFields();
  };

  const handleFileUpload =  (imageUrls: string[]) => {
    setImages([...imageUrls]);
  };


  const config = {};

  return (
    <div className="flex justify-center items-center ">
      {contextHolder}
      <Form layout="vertical" className="w-full" onFinish={onFinish}>
        <div className="mx-auto w-full mb-6   flex justify-center">
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
            defaultValue={name}
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
            placeholder="Enter short  description"
            value={shortDescription}
            defaultValue={shortDescription}
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
              console.log(content);
              dispatch(setDescription(content))
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
            defaultValue={pricePerHour}
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
            defaultValue={location}
          />
        </Form.Item>

        <div className="mx-auto">
          <Form.Item>
            <Button
              className="bg-black w-full mx-auto text-white "
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateFacility;
