import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "@/redux/api/dashboard/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { setSubTitle, setTitle } from "@/redux/features/categorySlice";
import Button from "@/components/UI/Button";

type TCreateCategory = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategory = ({ setIsOpen }: TCreateCategory) => {
  const [createCategory] = useCreateCategoryMutation();
  const dispatch = useDispatch();
  const { title, subtitle } = useAppSelector((state) => state.category);
  const [loading, setLoading] = useState(false);

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !subtitle) {
      toast.error("Please enter title and subtitle.");
      return;
    }

    try {
      setLoading(true);
      const response = await createCategory({ title, subtitle });

      if (response?.data?.success) {
        toast.success(response.data.message);
        dispatch(setTitle(""));
        dispatch(setSubTitle(""));
        setIsOpen(false);
      } else {
        toast.error(
          response?.error?.toString() || "Failed to create category.",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <form className="w-full space-y-6" onSubmit={onFinish}>
        <label className="grid gap-2 text-sm text-slate-700">
          <span>Title</span>
          <input
            type="text"
            required
            value={title ?? ""}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            placeholder="Enter title"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700">
          <span>Subtitle</span>
          <textarea
            required
            value={subtitle ?? ""}
            onChange={(e) => dispatch(setSubTitle(e.target.value))}
            placeholder="Enter subtitle"
            className="min-h-[160px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
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

export default CreateCategory;
