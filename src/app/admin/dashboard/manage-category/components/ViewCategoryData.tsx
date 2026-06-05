/* eslint-disable @next/next/no-img-element */
import { CategoryDataType } from "@/types/category.type";
import { useState } from "react";
import Modal from "@/components/Shared/Modal/Modal";

const ViewCategoryData = ({ data }: { data: CategoryDataType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
      >
        View
      </button>
      <Modal
        open={isOpen}
        title="Category Details"
        footer={false}
        onCancel={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center">
          <img
            src={data.image}
            alt={data.title}
            className="max-h-64 rounded-3xl object-cover"
          />
        </div>
        <h1 className="mt-4 text-lg font-bold text-slate-900">{data.title}</h1>
        <p className="mt-2 text-slate-700">{data.subtitle}</p>
      </Modal>
    </div>
  );
};

export default ViewCategoryData;
