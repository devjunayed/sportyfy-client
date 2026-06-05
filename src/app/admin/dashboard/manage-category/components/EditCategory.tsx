"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateCategoryMutation } from "@/redux/api/dashboard/categoryApi";
import { CategoryDataType } from "@/types/category.type";
import Modal from "@/components/Shared/Modal/Modal";
import Button from "@/components/UI/Button";
import FileUpload from "@/components/Shared/FileUpload/FileUpload";

interface EditCategoryProps {
  data: CategoryDataType;
  refetch: () => Promise<any>;
}

const EditCategory = ({ data, refetch }: EditCategoryProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [imageUrls, setImageUrls] = useState<string[]>([data.image]);

  const showModal = () => {
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setImageUrls([data.image]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    if (!data._id) {
      toast.error("Category id is missing.");
      return;
    }

    if (!title || !subtitle) {
      toast.error("Please add title and subtitle.");
      return;
    }

    try {
      const categoryData = {
        title,
        subtitle,
        image: imageUrls.length > 0 ? imageUrls[0] : data.image,
      };

      const response = await updateCategory({ id: data._id, categoryData });

      if (response?.data?.success) {
        toast.success("Category successfully updated");
        await refetch();
        setIsModalVisible(false);
      } else {
        toast.error(response?.data?.message || "Error updating category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category!");
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
      >
        Edit
      </button>
      <Modal
        title="Edit Category"
        open={isModalVisible}
        onCancel={handleCancel}
        width={820}
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <Button
              variant="secondary"
              onClick={handleCancel}
              className="text-slate-900"
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              onClick={handleOk}
              className="bg-slate-950 text-white"
            >
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <FileUpload
            initialFileUrls={imageUrls}
            maxUpload={1}
            resetKey={data._id || data.title}
            imgbbUrl={`https://api.imgbb.com/1/upload?key=${process.env.NEXT_IMGBB_API_KEY}`}
            handleFileUpload={(files) => setImageUrls(files)}
          />

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Title</span>
            <input
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span>Subtitle</span>
            <textarea
              className="min-h-[140px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
            />
          </label>
        </div>
      </Modal>
    </>
  );
};

export default EditCategory;
