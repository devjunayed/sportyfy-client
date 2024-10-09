/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";
import { FacilitiesDataType } from "../../pages/admin/ManageFacility";
import { Button, Form, GetProp, Image, Input, message, Modal, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useUpdateFacilityMutation } from "../../redux/api/dashboard/facilityApi";
import { getBase } from "../../utils/getBase";
import UploadButton from "../../components/ui/Shared/UploadButton/UploadButton";

interface EditFacilitiesProps {
  data: FacilitiesDataType;
  refetch: () => Promise<any>;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];


const EditFacilities = ({ data, refetch }: EditFacilitiesProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateFacility, { isLoading }] = useUpdateFacilityMutation();

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
    form.setFieldsValue({ name: data.name, description: data.description , pricePerHour: data.pricePerHour, location: data.location });

    // setting old image to the upload
    setFileList([
      {
        uid: "-1",
        name: "facility_image",
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
      const facilityData = {
        name: values.name,
        description: values.description,
        image: data.image, 
        pricePerHour: values.pricePerHour,
        location: values.location
      };

      const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

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
          facilityData.image = uploadedImageData.data.url;
        } else {
          messageApi.open({
            type: "error",
            content: "Error uploading image!",
          });
          return;
        }
      }

      // Debugging output: check what data is being sent
      console.log("Facility Data to be sent:", facilityData);

      // Sending updated data to the server
      const id = data._id;
      const response = await updateFacility({ id, facilityData });

     

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
          form={form}
          onFinish={handleOk} // Form submit handler
          name="control-hooks"
          style={{ maxWidth: 600 }}
        >
          <Modal
            title="Edit Facility"
            open={isModalVisible}
            onOk={() => form.submit()} 
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
                {fileList.length >= 1 ? null : <UploadButton />}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) =>
                      setPreviewOpen(visible),
                  }}
                  src={previewImage}
                />
              )}
            </div>
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
