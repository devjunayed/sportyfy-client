export interface IFormValues {
  name: string;
  placeholder?: string
  label: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
  type?: string;
  size?: "sm" | "md" | "lg" | undefined;
  required?: boolean;
  className?: string;
}
