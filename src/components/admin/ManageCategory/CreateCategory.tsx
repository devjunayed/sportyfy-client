import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateCategoryMutation } from "../../../redux/api/dashboard/categoryApi";
import { useAppSelector } from "../../../redux/hooks";
import { setSubTitle, setTitle } from "../../../redux/features/categorySlice";
import { ClockLoader } from "react-spinners";

type TCreateCategory = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategory = ({ setIsOpen }: TCreateCategory) => {
  const [createCategory] = useCreateCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { title, subtitle } = useAppSelector((state) => state.category);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      setLoading(true);
      const response = await createCategory({
        title,
        subtitle,
      });

      if (response?.data?.success) {
        messageApi.success(response?.data?.message);
        onReset();
        dispatch(setTitle(""));
        dispatch(setSubTitle(""));
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const onReset = () => {
    form.resetFields();
  };



  return (
    <div className="flex min-h-[50vh] justify-center items-center  ">
      {contextHolder}

      {loading ? (
        <div>
          <ClockLoader loading={true} />
        </div>
      ) : (
        <Form layout="vertical" className="w-full " onFinish={onFinish}>
         
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input
              key="title"
              onChange={(e) => dispatch(setTitle(e.target.value))}
              value={title}
              placeholder="Enter title"
            />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="subtitle"
            rules={[{ required: true, message: "Please enter subtitle" }]}
          >
            <Input.TextArea
              key="subtitle"
              onChange={(e) => dispatch(setSubTitle(e.target.value))}
              placeholder="Enter subtitle"
              value={subtitle}
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
      )}
    </div>
  );
};

export default CreateCategory;
