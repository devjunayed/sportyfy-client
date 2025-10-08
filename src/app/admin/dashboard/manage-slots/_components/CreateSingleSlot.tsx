"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, DatePicker, TimePicker, Select } from "antd";
import { useCreateSlotMutation } from "@/redux/api/dashboard/slotApi";
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import { TSlot } from "@/types/slot.type";
import dayjs from "dayjs";
import { TFacility } from "@/types/facility.type";

const { Option } = Select;

const CreateSingleSlot = () => {
  const { handleSubmit, control, reset } = useForm<TSlot>();
  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const { data: facilitiesData, isLoading: facilitiesLoading } =
    useGetFacilitiesQuery("");

  const onSubmit = async (data: any) => {
    const slotData = {
      ...data,
      date: dayjs(data.date).format("YYYY-MM-DD"),
      startTime: dayjs(data.startTime).format("HH:mm"),
      endTime: dayjs(data.endTime).format("HH:mm"),
    };
    try {
      await createSlot(slotData).unwrap();
      reset();
    } catch (error) {
      console.error("Failed to create slot:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: "1rem" }}>
        <label>Facility</label>
        <Controller
          name="facility"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              loading={facilitiesLoading}
              placeholder="Select a facility"
            >
              {facilitiesData?.data?.map((facility: TFacility) => (
                <Option key={facility._id} value={facility._id}>
                  {facility.name}
                </Option>
              ))}
            </Select>
          )}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Date</label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker {...field} style={{ width: "100%" }} />
          )}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Start Time</label>
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              style={{ width: "100%" }}
              format="HH:mm"
              value={field.value ? dayjs(field.value, "HH:mm") : null}
              onChange={(time) => {
                field.onChange(time ? time.format("HH:mm") : null);
              }}
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
            />
          )}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>End Time</label>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              style={{ width: "100%" }}
              format="HH:mm"
              value={field.value ? dayjs(field.value, "HH:mm") : null}
              onChange={(time) => {
                field.onChange(time ? time.format("HH:mm") : null);
              }}
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
            />
          )}
        />
      </div>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Create Slot
      </Button>
    </form>
  );
};

export default CreateSingleSlot;
