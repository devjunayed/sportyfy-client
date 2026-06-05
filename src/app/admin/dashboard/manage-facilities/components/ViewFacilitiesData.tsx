"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { formattedPrice } from "@/utils/formattedPrice";
import { FacilitiesDataType } from "@/types/facility.type";
import Modal from "@/components/Shared/Modal/Modal";

const ViewFacilitiesData = ({ data }: { data: FacilitiesDataType }) => {
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
        onCancel={() => setIsOpen(false)}
        title="Facility Details"
        footer={false}
        open={isOpen}
      >
        <img
          src={data.images[0]}
          alt={data.name}
          className="w-full rounded-3xl object-cover"
        />
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-bold text-slate-900">{data.name}</h1>
          <span className="flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
            {formattedPrice(data.pricePerHour)} / hour
          </span>
        </div>
        <span className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <IoLocation /> {data.location}
        </span>
        <div className="mt-4 space-y-3">
          <div>
            <h2 className="font-semibold text-slate-900">Short Description</h2>
            <p className="mt-2 text-slate-700">{data.shortDescription}</p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Description</h2>
            <div
              className="mt-2 text-slate-700"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewFacilitiesData;
