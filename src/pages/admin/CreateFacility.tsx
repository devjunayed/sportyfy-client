import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import {
  setDescription,
  setLocation,
  setName,
  setPricePerHour,
} from "../../redux/features/facilitiySlice";
import { useAppSelector } from "../../redux/hooks";
import { useCreateFacilityMutation } from "../../redux/api/dashboard/facilityApi";

const CreateFacility = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { name, description, location, pricePerHour } = useAppSelector(
    (state) => state.facility
  );
  const [createFacility] = useCreateFacilityMutation();

  const onFinish = async () => {
    const facilityData = { name, description, pricePerHour, location };
    const result = await createFacility(facilityData);

    if (result.data.success) {
      messageApi.open({
        type: "success",
        content: result.data.message,
      });
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {contextHolder}
      <Form
        layout="vertical"
        className="w-full mx-10 md:mx-28 lg:mx-40 xl:mx-64"
        onFinish={onFinish}
      >
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
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            onChange={(e) => dispatch(setDescription(e.target.value))}
            placeholder="Enter description"
            value={description}
            defaultValue={description}
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
