import React, { useState } from "react";
import { Button, Form, Image, Input, Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
  address?: string;
};
type FileType = { originFileObj: File; name: string; url?: string };

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadToImgbb = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://api.imgbb.com/1/upload?key=903f4150a329ec1e445f236bfca4c170", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result.data.url;
};

const Registration: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ fileList: newFileList, file }) => {
    // Upload the file manually to imgbb and get the URL
    if (file.status === "uploading") {
      const imageUrl = await uploadToImgbb(file.originFileObj as File);
      console.log("Image uploaded to imgbb:", imageUrl);
      file.url = imageUrl;
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <button
      className=""
      style={{ border: 0, background: "none" }}
      type="button"
    >
      <PlusOutlined className="text-white" />
      <div className="text-white" style={{ marginTop: 8 }}>
        Upload
      </div>
    </button>
  );

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(./src/assets/images/registration.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="flex shadow-xl bg-gray-800 justify-center w-full items-center bg-transparent">
          <Form
            className=" w-[90vw] md:w-[70vw] lg:w-[50vw] p-10 shadow-inner rounded-xl text-white shadow-white"
            name="trigger"
            layout="vertical"
            autoComplete="off"
            onFinish={(values) => console.log("Success:", values)}
            onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
          >
            <h2 className="text-3xl font-bold uppercase mb-10">Register</h2>

            {/* Image upload */}
            <div className="flex w-full mb-6 justify-center items-center">
              <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={() => {}}
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
