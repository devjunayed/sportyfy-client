import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateCategoryMutation } from "../../../redux/api/dashboard/categoryApi";
import { useAppSelector } from "../../../redux/hooks";
import FileUpload from "../../ui/Shared/FileUpload/FileUpload";
import { setSubTitle, setTitle } from "../../../redux/features/categorySlice";
import { ClockLoader } from "react-spinners";

type TCreateCategory = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategory = ({ setIsOpen }: TCreateCategory) => {
  const [createCategory] = useCreateCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState<string>("");
  const dispatch = useDispatch();
  const { title, subtitle } = useAppSelector((state) => state.category);
  const [resetKey, setResetKey] = useState(`${Date.now().toString()}`);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      setLoading(true);
      const response = await createCategory({
        title,
        subtitle,
        image,
      });

      if (response?.data?.success) {
        messageApi.success(response?.data?.message)
          onReset();
          setImage("");
          dispatch(setTitle(""));
          dispatch(setSubTitle(""));
          setResetKey(`${Date.now().toString()}`);
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

  const handleFileUpload = (imageUrls: string[]) => {
    setImage(imageUrls[0]);
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
          <div className="mx-auto w-full mb-6   flex justify-center">
            <FileUpload
              maxUpload={1}
              resetKey={resetKey}
              imgbbUrl={`https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMGBB_API_KEY
              }`}
              handleFileUpload={handleFileUpload}
            />
          </div>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input
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
