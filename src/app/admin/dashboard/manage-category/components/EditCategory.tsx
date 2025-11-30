/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  message,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";
import { getBase } from "@/utils/getBase";

import { CategoryDataType } from "@/types/category.type";
import { useUpdateCategoryMutation } from "@/redux/api/dashboard/categoryApi";

interface EditCategoryProps {
  data: CategoryDataType;
  refetch: () => Promise<any>;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const EditCategory = ({ data, refetch }: EditCategoryProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (file.status === "uploading" || file.status === "error") {
        return { ...file, status: "done" };
      }
      return file;
    });

    setFileList(updatedFileList as UploadFile[]);
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };

  // Open modal
  const showModal = () => {
    // setting old value to the form
    form.setFieldsValue({
      title: data.title,
      subtitle: data.subtitle,
    });

    // setting old image to the upload
    setFileList([
      {
        uid: "-1",
        name: "category_image",
        status: "done",
        url: data.image,
      },
    ]);
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
      const categoryData = {
        title: values.title,
        subtitle: values.subtitle,
        image: data.image,
      };

      const imgbbKey = process.env.NEXT_IMGBB_API_KEY;

      // Checking if a new image is uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj as Blob);
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadedImageData = await response.json();

        if (uploadedImageData.success) {
          categoryData.image = uploadedImageData.data.url;
        } else {
          messageApi.open({
            type: "error",
            content: "Error uploading image!",
          });
          return;
        }
      }


      // Sending updated data to the server
      const id = data._id;
      const response = await updateCategory({ id, categoryData });

      if (response?.data?.success) {
        messageApi.open({
          type: "success",
          content: "Category successfully updated",
        });
        refetch();
        setIsModalVisible(false);
      } else {
        messageApi.open({
          type: "error",
          content: response?.data?.message || "Error updating category",
        });
        console.log(response)
      }
    } catch (error) {
      console.error("Error updating category:", error);
      messageApi.open({
        type: "error",
        content: "Error updating category!",
      });
    }
  };

  return (
    <>
      <a onClick={showModal}>
        <EditOutlined size={24} />
      </a>
      <div className="w-full mx-auto">
        {contextHolder}
        <Form
          form={form}
          onFinish={handleOk}
          name="control-hooks"
          style={{ maxWidth: 600 }}
        >
          <Modal
            title="Edit Category"
            open={isModalVisible}
            onOk={() => form.submit()}
            confirmLoading={isLoading}
            onCancel={handleCancel}
            okText="Save"
            cancelText="Cancel"
            footer={[
              <Button key="reset" className="text-white" onClick={onReset}>
                Reset
              </Button>,
              <Button key="back" className="text-white" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                className="bg-black text-white hover:bg-gray-900"
                loading={isLoading}
                onClick={() => form.submit()}
              >
                Save
              </Button>,
            ]}
          >
            <div className="mx-auto w-full mb-6 flex justify-center">
              <Upload
                action={""}
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined className="text-black" />
                    <div className="text-black" style={{ marginTop: 8 }}>
                      Upload
                    </div>
                  </button>
                )}
              </Upload>
              {previewImage && (
                <Image
                alt=""
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="subtitle"
              label="Subtitle"
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

export default EditCategory;
