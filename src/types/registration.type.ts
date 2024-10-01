import { GetProp, UploadProps } from "antd";

export type RegistrationFieldType = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
};
export type RegistrationFileType = Parameters<
  GetProp<UploadProps, "beforeUpload">
>[0];
