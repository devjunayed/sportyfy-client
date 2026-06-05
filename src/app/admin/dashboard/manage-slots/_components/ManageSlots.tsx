"use client";
/* eslint-disable @next/next/no-img-element */
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import { formattedPrice } from "@/utils/formattedPrice";
import { useState } from "react";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import BulkGenerateModal from "./BulkGenerateModal";
import CreateSingleSlotModal from "./CreateSingleSlotModal";

export interface FacilitiesDataType {
  _id: string;
  name: string;
  images: string[];
  description: string;
  shortDescription: string;
  category: string;
  rating: number;
  capacity: number;
  openHours: number;
  highlight: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
}

const ManageSlots = () => {
  const { data = [], isLoading } = useGetFacilitiesQuery("");
  const [bulkOpen, setBulkOpen] = useState(false);
  const [singleOpen, setSingleOpen] = useState(false);
  const facilities = data?.data || [];

  return (
    <div className="mt-20 max-h-[85vh] overflow-y-auto">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">Manage Slots</h1>
        <div className="flex flex-wrap gap-2">
          <CreateSingleSlotModal isOpen={singleOpen} setIsOpen={setSingleOpen} />
          <BulkGenerateModal isOpen={bulkOpen} setIsOpen={setBulkOpen} />
        </div>
      </div>

      <HandleDataLoading loadingOnly data={facilities} isLoading={isLoading}>
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["No.", "Image", "Facility Name", "Location", "PPH", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left font-semibold text-slate-700"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {facilities.map((record: FacilitiesDataType, index: number) => (
                <tr key={record._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 text-slate-700">{index + 1}</td>
                  <td className="px-4 py-4">
                    <img
                      src={record.images?.[0]}
                      alt={record.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {record.name}
                  </td>
                  <td className="min-w-72 px-4 py-4 text-slate-700">
                    {record.location}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {formattedPrice(record.pricePerHour)}
                  </td>
                  <td className="px-4 py-4 text-slate-500">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default ManageSlots;
