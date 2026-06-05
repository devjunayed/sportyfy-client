"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@/components/UI/Button";
import FileUpload from "@/components/Shared/FileUpload/FileUpload";
import Modal from "@/components/Shared/Modal/Modal";
import { FacilitiesDataType } from "@/types/facility.type";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useState, type FormEvent } from "react";
import { useUpdateFacilityMutation } from "@/redux/api/dashboard/facilityApi";

interface EditFacilityProps {
  data: FacilitiesDataType;
  refetch: () => Promise<any>;
}

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

const EditFacility = ({ data, refetch }: EditFacilityProps) => {
  const [updateFacility, { isLoading }] = useUpdateFacilityMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now().toString());
  const [images, setImages] = useState<string[]>(data.images || []);
  const [formData, setFormData] = useState({
    name: data.name,
    description: data.description,
    shortDescription: data.shortDescription,
    location: data.location,
    pricePerHour: data.pricePerHour,
    category: data.category,
    capacity: data.capacity,
    openHours: String(data.openHours),
    highlight: data.highlight,
    isDeleted: data.isDeleted,
  });

  const setField = (field: keyof typeof formData, value: string | number | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleCancel = () => {
    setIsOpen(false);
    setImages(data.images || []);
    setFormData({
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      location: data.location,
      pricePerHour: data.pricePerHour,
      category: data.category,
      capacity: data.capacity,
      openHours: String(data.openHours),
      highlight: data.highlight,
      isDeleted: data.isDeleted,
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const facilityData = {
      ...formData,
      images,
    };

    try {
      const response = await updateFacility({ id: data._id, facilityData }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Facility updated successfully");
        await refetch();
        setIsOpen(false);
        setResetKey(Date.now().toString());
      } else {
        toast.error(response?.message || "Update failed.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
        aria-label={`Edit ${data.name}`}
      >
        <Pencil size={16} />
      </button>

      <Modal
        width={820}
        title="Edit Facility"
        open={isOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="mx-auto flex w-full justify-center">
            <FileUpload
              initialFileUrls={images}
              maxUpload={10}
              resetKey={resetKey}
              imgbbUrl={`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`}
              handleFileUpload={(imageUrls) => setImages([...imageUrls])}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-700">
              <span>Name</span>
              <input
                className={inputClass}
                value={formData.name}
                onChange={(event) => setField("name", event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-700">
              <span>Category</span>
              <input
                className={inputClass}
                value={formData.category}
                onChange={(event) => setField("category", event.target.value)}
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Short Description</span>
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              value={formData.shortDescription}
              onChange={(event) =>
                setField("shortDescription", event.target.value)
              }
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Description</span>
            <textarea
              className={`${inputClass} min-h-40 resize-y`}
              value={formData.description}
              onChange={(event) => setField("description", event.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-700">
              <span>Price Per Hour</span>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={formData.pricePerHour}
                onChange={(event) =>
                  setField("pricePerHour", Number(event.target.value))
                }
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-700">
              <span>Capacity</span>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={formData.capacity}
                onChange={(event) =>
                  setField("capacity", Number(event.target.value) || 1)
                }
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Location</span>
            <input
              className={inputClass}
              value={formData.location}
              onChange={(event) => setField("location", event.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-700">
              <span>Open Hours</span>
              <input
                className={inputClass}
                value={formData.openHours}
                onChange={(event) => setField("openHours", event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-700">
              <span>Highlight</span>
              <input
                className={inputClass}
                value={formData.highlight}
                onChange={(event) => setField("highlight", event.target.value)}
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditFacility;
