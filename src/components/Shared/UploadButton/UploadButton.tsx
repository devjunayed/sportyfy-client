import { Plus } from "lucide-react";

const UploadButton = () => {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
    >
      <Plus size={20} />
      <div className="mt-2 text-sm font-medium">Upload</div>
    </button>
  );
};

export default UploadButton;
