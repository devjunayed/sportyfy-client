import React, { useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { RegistrationFileType } from "../../types/registration.type";
import { getBase } from "../../utils/getBase";
import { uploadButton } from "../../components/ui/Shared/UploadButton/uploadButton";


const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

/*===================================
       Main Registration function
=====================================*/
const Registration: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase(file.originFileObj as RegistrationFileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  

  const onFinish = async (values: RegistrationFileType) => {
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

    // Check if image is uploaded or not
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const imageFile = fileList[0].originFileObj;

      // Create separate formData for image upload
      const imageData = new FormData();
      imageData.append("image", imageFile);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const data = await response.json();
        if (data.success) {
          // Now that the image is uploaded, create a payload to send to the server
          const userData = {
            name: values.name,
            description: values.description,
            profileImg: data.data.url, // Using the uploaded image URL
          };

          console.log("Sending userData to the server:", userData);

          // Send data to your server
          const category = await createCategory(categoryData);
          if (category.data.success) {
            messageApi.open({
              type: "success",
              content: "Category successfully created",
            });
            setFileList([]);
          } else {
            messageApi.open({
              type: "error",
              content: category.data.message,
            });
          }
        } else {
          console.error("Upload failed:", data);
          messageApi.open({
            type: "error",
            content: "Error uploading image!",
          });
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        messageApi.open({
          type: "error",
          content: "Error uploading image!",
        });
        return;
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Image file not found!",
      });
      return;
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(./src/assets/images/registration.jpg)",
      }}
    >
      {contextHolder}
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="flex shadow-xl bg-gray-800 justify-center w-full items-center bg-transparent">
          <Form
            className=" w-[90vw] md:w-[70vw] lg:w-[50vw] p-10 shadow-inner rounded-xl text-white shadow-white"
            name="trigger"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <h2 className="text-3xl font-bold uppercase mb-10">Register</h2>

            {/* Image upload */}
            <div className="flex w-full mb-6 justify-center items-center">
              <Upload
                action="https://api.imgbb.com/1/upload?key=903f4150a329ec1e445f236bfca4c170"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}

            {/* Name Field */}
            <Form.Item
              className="w-full"
              hasFeedback
              label={<span className="text-white">Name</span>}
              name="name"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Please input your name!", max: 30 },
              ]}
            >
              <Input
                style={{ color: "white" }}
                placeholder="Enter your name"
                className="w-full white-placeholder"
                inputMode="text"
                onChange={(e) => console.log(e.target.value)}
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              className="w-full"
              hasFeedback
              label={<span className="text-white">Email</span>}
              name="email"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                style={{ color: "white" }}
                placeholder="Enter your email"
                className="w-full"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              className="w-full"
              hasFeedback
              label={<span className="text-white">Password</span>}
              name="password"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                },
              ]}
            >
              <Input.Password
                style={{ color: "white" }}
                placeholder="Enter your password"
                className="w-full"
              />
            </Form.Item>

            {/* Phone Field */}
            <Form.Item
              className="w-full"
              hasFeedback
              label={<span className="text-white">Phone</span>}
              name="phone"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                style={{ color: "white" }}
                placeholder="Enter your phone number"
                className="w-full"
              />
            </Form.Item>

            {/* Role Field */}
            <Form.Item
              className="w-full"
              hasFeedback
              label={<span className="text-white">Role</span>}
              name="role"
              validateTrigger="onBlur"
              rules={[{ required: true, message: "Please input your role!" }]}
            >
              <Input
                style={{ color: "white" }}
                placeholder="Enter your role"
                className="w-full"
              />
            </Form.Item>

            {/* Address Field */}
            <Form.Item
              className="w-full white-placeholder"
              hasFeedback
              label={<span className="text-white">Address</span>}
              name="address"
              validateTrigger="onBlur"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea
                style={{ color: "white" }}
                placeholder="Enter your address"
                className="w-full white-placeholder"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className="mt-5 text-white "
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
