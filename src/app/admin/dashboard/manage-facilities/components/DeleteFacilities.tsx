"use client";
import { useDeleteFacilityMutation } from "@/redux/api/dashboard/facilityApi";
import { FacilitiesDataType } from "@/types/facility.type";
import { toast } from "sonner";

interface DeleteFacilitiesProps {
  data: FacilitiesDataType;
  refetch: () => Promise<any>;
}

const DeleteFacilities = ({ data, refetch }: DeleteFacilitiesProps) => {
  const [deleteFacility] = useDeleteFacilityMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${data.name}? This action cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteFacility(data._id).unwrap();
      if (result.success) {
        await refetch();
        toast.success("Deleted successfully!");
      } else {
        toast.error("Delete failed.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Delete failed.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
    >
      Delete
    </button>
  );
};

export default DeleteFacilities;
