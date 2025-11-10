/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { IFormValues } from "@/types/form.type";
import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";

interface ISInput extends IFormValues {
  defaultValue?: string,
  value?: string
}

const SInput = ({
  name,
  className ="",
  placeholder,
  label,
  variant = "bordered",
  type = "",
  size = "md",
  end,
  start,
  defaultValue,
  value,
  required = false,
}: ISInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      endContent={end}
      startContent={start}
      classNames={{
        input: `${className}`,
      }}
      {...register(name)}
      placeholder={placeholder}
      label={label}
      required={required}
      labelPlacement="outside-top"
      size={size}
      type={type}
      variant={variant}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
    />
  );
};

export default SInput;
