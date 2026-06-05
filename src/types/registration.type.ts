export type RegistrationFieldType = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: "user" | "admin";
};

export type RegistrationFileType = File;
