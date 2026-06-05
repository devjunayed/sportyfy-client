import { useDeleteCategoryMutation } from "@/redux/api/dashboard/categoryApi";
import { CategoryDataType } from "@/types/category.type";
import { toast } from "sonner";

interface DeleteCategoryProps {
  data: CategoryDataType;
  refetch: () => Promise<any>;
}

const DeleteCategory = ({ data, refetch }: DeleteCategoryProps) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${data.title}? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteCategory(data._id).unwrap();
      if (result?.success) {
        await refetch();
        toast.success("Deleted successfully!");
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Delete failed");
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

export default DeleteCategory;
