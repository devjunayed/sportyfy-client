import {
  Form,
  Input,
  Button,
  message,
  Upload,
  GetProp,
  UploadProps,
  UploadFile,
  Image,
} from "antd";
import { useCreateFacilityMutation } from "../../redux/api/dashboard/facilityApi";
import { useState } from "react";
import { getBase } from "../../utils/getBase";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { setDescription, setLocation, setName, setPricePerHour } from "../../redux/features/facilitiySlice";
import { PlusOutlined } from "@ant-design/icons";



type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CreateFacility = () => {
  const [createFacility] = useCreateFacilityMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { name, description, location, pricePerHour } = useAppSelector(
    (state) => state.facility
  );

  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // handle preview uploaded image
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // handle change of uploading image
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (file.status === "uploading" || file.status === "error") {
        return { ...file, status: "done" };
      }
      return file;
    });

    setFileList(updatedFileList as UploadFile[]);
  };

  const onFinish = async () => {
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
          const facilityData = {
            name,
            description,
            image: data.data.url, 
            location,
            pricePerHour
          };

          console.log("Sending facilityData to the server:", facilityData);

          // Send data to your server
          const facility = await createFacility(facilityData);

          console.log(facility)
          if (facility?.data?.success) {
            messageApi.open({
              type: "success",
              content: "Facility successfully created",
            });
            setFileList([]);
            onReset();
          } else {
            messageApi.open({
              type: "error",
              content: facility.data.message,
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
        console.log(error);
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

  // Reset form function
  const onReset = () => {
    form.resetFields();
    setFileList([]);
    setPreviewImage("");
  };

  return (
    <div className="flex mt-20 justify-center items-center ">
      {contextHolder}
      <Form
      
        layout="vertical"
        className="w-full mx-10 md:mx-28 lg:mx-40 xl:mx-64"
        onFinish={onFinish}
      >
        <div className="mx-auto w-full mb-6   flex justify-center">
          <Upload
            action={""}
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} 
          >
            {fileList.length >= 1 ? null : <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined className="text-black" />
      <div className="text-black" style={{ marginTop: 8 }}>
        Upload
      </div>
    </button>}
          </Upload>
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
