"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetFacilitiesQuery } from "@/redux/api/dashboard/facilityApi";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import CreateFacility from "./CreateFacility";
import { formattedPrice } from "@/utils/formattedPrice";
import ViewFacilitiesData from "./ViewFacilitiesData";
import DeleteFacilities from "./DeleteFacilities";
import Button from "@/components/UI/Button";
import Modal from "@/components/Shared/Modal/Modal";

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

const ManageFacility = () => {
  const { data = [], refetch, isLoading } = useGetFacilitiesQuery("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-20 overflow-y-auto max-h-[85vh]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Facility</h1>
        <Button onClick={() => setIsOpen(true)}>Add Facility</Button>
      </div>

      <Modal
        open={isOpen}
        title="Add Facility"
        footer={false}
        onCancel={() => setIsOpen(false)}
        width={820}
      >
        <CreateFacility />
      </Modal>

      <HandleDataLoading loadingOnly data={data.data} isLoading={isLoading}>
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  No.
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Image
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Facility Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Location
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  PPH
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.data.map((record: FacilitiesDataType, index: number) => (
                <tr key={record._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">
                    <img
                      className="h-12 w-12 rounded-xl object-cover"
                      src={record.images[0]}
                      alt={record.name}
                    />
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {record.name}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.location}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {formattedPrice(record.pricePerHour)}
                  </td>
                  <td className="px-4 py-4 space-x-2">
                    <ViewFacilitiesData data={record} />
                    <DeleteFacilities refetch={refetch} data={record} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default ManageFacility;
