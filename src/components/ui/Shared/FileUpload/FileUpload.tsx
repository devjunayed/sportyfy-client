/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import { toast } from "react-toastify";
import type { UploadFile, UploadProps } from "antd";

type FileType = NonNullable<UploadFile["originFileObj"]>;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface FileUploadProps {
  maxUpload?: number
  imgbbUrl: string;
  className?: string;
  handleFileUpload: (files: string[]) => void;
  initialFileUrls?: string[];
  resetKey: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxUpload= 3,
  imgbbUrl,
  className,
  handleFileUpload,
  initialFileUrls = [],
  resetKey,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<any>([]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (initialFileUrls.length > 0) {
      const initialFiles = initialFileUrls.map((url) => ({
        uid: url,
        name: url,
        status: "done",
        url,
        thumbUrl: url,
      }));
      setFileList(initialFiles);
      setImageUrls(initialFileUrls);
    }
  }, [initialFileUrls]);

  useEffect(() => {
    setFileList([]);
  }, [resetKey]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {

    const newList = newFileList
      .map((list) => {
        if (list.response) {
          // if (!list.response.name.includes("https://")) {
          //   return null;
          // }
          return list.response;
        }
        return list;
      })
      .filter((list) => list.name.includes("https://"));

    const newImagesLink = newList.map((list) => list.name) || [];
    setImageUrls(newImagesLink);
    setFileList(() => [...newList]);
  };


  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        imgbbUrl,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      

      if (response.ok && data.success) {
        const uploadedFile = {
          uid: data.data.id,
          name: data.data.title,
          status: "done",
          url: data.data.display_url,
          thumbUrl: data.data.thumb.url,
        };

        // Update file list with the newly uploaded file
        setFileList((prevList: any) => [...prevList, uploadedFile]);

        if (handleFileUpload) {

          handleFileUpload([...imageUrls, uploadedFile.url as string]);
        }

        toast.success("Image uploaded");
        onSuccess(uploadedFile);
      }
    } catch (error: any) {
      onError(error);
      console.log(error);
      toast.error("image Upload failed");
    }
  };

  const uploadButton = (
    <div className={className}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        onRemove={(file) => {
          // Ensure the image is removed from the list
          const newFileList = fileList.filter((f: any) => f.uid !== file.uid);
          setFileList(newFileList); // Update state to remove the file
          if (handleFileUpload) {
            const newImageUrls = newFileList.filter((u: any) => u.url as string);
            handleFileUpload([...newImageUrls as string]);
          }
        }}
      >
        {fileList.length >= maxUpload ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          alt=""
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FileUpload;