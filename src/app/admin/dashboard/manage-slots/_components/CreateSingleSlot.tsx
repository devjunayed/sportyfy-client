"use client";

import Button from "@/components/UI/Button";
import { useCreateSlotMutation } from "@/redux/api/dashboard/slotApi";
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import { TSlot } from "@/types/slot.type";
import { TFacility } from "@/types/facility.type";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const fieldClass =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

const CreateSingleSlot = ({ onCreated }: { onCreated?: () => void }) => {
  const { handleSubmit, control, reset } = useForm<TSlot>();
  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const { data: facilitiesData, isLoading: facilitiesLoading } =
    useGetFacilitiesQuery("");

  const onSubmit = async (data: TSlot) => {
    try {
      await createSlot(data).unwrap();
      toast.success("Slot created successfully");
      reset();
      onCreated?.();
    } catch (error) {
      console.error("Failed to create slot:", error);
      toast.error("Failed to create slot");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        <span>Facility</span>
        <Controller
          name="facility"
          control={control}
          render={({ field }) => (
            <select {...field} className={fieldClass} disabled={facilitiesLoading}>
              <option value="">Select a facility</option>
              {facilitiesData?.data?.map((facility: TFacility) => (
                <option key={facility._id} value={facility._id}>
                  {facility.name}
                </option>
              ))}
            </select>
          )}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-700">
        <span>Date</span>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <input {...field} type="date" className={fieldClass} />
          )}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          <span>Start Time</span>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <input {...field} type="time" className={fieldClass} />
            )}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          <span>End Time</span>
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <input {...field} type="time" className={fieldClass} />
            )}
          />
        </label>
      </div>

      <div className="flex justify-end border-t border-slate-200 pt-4">
        <Button type="submit" isLoading={isLoading}>
          Create Slot
        </Button>
      </div>
    </form>
  );
};

export default CreateSingleSlot;
