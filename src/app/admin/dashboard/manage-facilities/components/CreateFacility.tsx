"use client";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useCreateFacilityMutation } from "@/redux/api/dashboard/facilityApi";
import { useAppSelector } from "@/redux/hooks";
import FileUpload from "@/components/Shared/FileUpload/FileUpload";
import Button from "@/components/UI/Button";
import {
  setDescription,
  setLocation,
  setName,
  setPricePerHour,
  setShortDescription,
  setCategory,
  setCapacity,
  setOpenHours,
  setHighlight,
} from "@/redux/features/facilitiySlice";

const CreateFacility = () => {
  const [createFacility] = useCreateFacilityMutation();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    name,
    description,
    shortDescription,
    location,
    pricePerHour,
    category,
    capacity,
    openHours,
    highlight,
    isDeleted,
  } = useAppSelector((state) => state.facility);

  const [resetKey, setResetKey] = useState(`${Date.now().toString()}`);

  const onFinish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await createFacility({
        name,
        description,
        shortDescription,
        location,
        pricePerHour,
        images,
        category,
        capacity,
        openHours,
        highlight,
        isDeleted,
      });

      if (response.data?.success) {
        toast.success(response.data.message);
        setImages([]);
        setResetKey(`${Date.now().toString()}`);
      } else {
        toast.error(response.data?.message || "Failed to create facility.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create facility.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (imageUrls: string[]) => {
    setImages([...imageUrls]);
  };

  return (
    <div className="flex justify-center items-center">
      <form className="w-full space-y-6" onSubmit={onFinish}>
        <div className="mx-auto w-full mb-6 flex justify-center">
          <FileUpload
            initialFileUrls={images}
            maxUpload={10}
            resetKey={resetKey}
            imgbbUrl={`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`}
            handleFileUpload={handleFileUpload}
          />
        </div>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Name</span>
          <input
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={name ?? ""}
            onChange={(e) => dispatch(setName(e.target.value))}
            placeholder="Enter name"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Short Description</span>
          <textarea
            className="min-h-30 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={shortDescription ?? ""}
            onChange={(e) => dispatch(setShortDescription(e.target.value))}
            placeholder="Enter short description"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Description</span>
          <textarea
            className="min-h-40 w-full resize-y rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={description ?? ""}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            placeholder="Enter full description"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Price per Hour</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={pricePerHour ?? 0}
            onChange={(e) => dispatch(setPricePerHour(Number(e.target.value)))}
            placeholder="Enter price per hour"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Location</span>
          <input
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={location ?? ""}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            placeholder="Enter location"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Category</span>
          <input
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={category ?? ""}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            placeholder="Enter category"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Capacity</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={capacity ?? 1}
            onChange={(e) => dispatch(setCapacity(Number(e.target.value) || 1))}
            placeholder="Enter capacity"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Open Hours</span>
          <input
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={openHours ?? ""}
            onChange={(e) => dispatch(setOpenHours(e.target.value))}
            placeholder="Example: 08:00 AM - 10:00 PM"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Highlight</span>
          <input
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            value={highlight ?? ""}
            onChange={(e) => dispatch(setHighlight(e.target.value))}
            placeholder="Highlight text"
          />
        </label>

        <div className="flex justify-center">
          <Button type="submit" isLoading={loading} className="w-full max-w-xs">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFacility;
