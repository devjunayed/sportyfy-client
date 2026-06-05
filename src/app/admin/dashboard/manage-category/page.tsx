"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import { useGetCategoriesQuery } from "@/redux/api/dashboard/categoryApi";
import CreateCategory from "./components/CreateCategory";
import { CategoryDataType } from "@/types/category.type";
import ViewCategoryData from "./components/ViewCategoryData";
import EditCategory from "./components/EditCategory";
import DeleteCategory from "./components/DeleteCategory";
import Modal from "@/components/Shared/Modal/Modal";
import Button from "@/components/UI/Button";

const ManageCategory = () => {
  const { data, refetch, isLoading } = useGetCategoriesQuery("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-20 overflow-y-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Category</h1>
        <Button onClick={() => setIsOpen(true)}>Add Category</Button>
      </div>

      <Modal
        open={isOpen}
        title="Add Category"
        footer={false}
        onCancel={() => setIsOpen(false)}
        width={820}
      >
        <CreateCategory setIsOpen={setIsOpen} />
      </Modal>

      <div className="h-[80vh] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <HandleDataLoading loadingOnly data={data?.data} isLoading={isLoading}>
          <div className="overflow-x-auto">
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
                    Category title
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Category subtitle
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data?.data?.map((record: CategoryDataType, index: number) => (
                  <tr key={record._id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">
                      <img
                        src={record.image}
                        alt={record.title}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-900">
                      {record.title}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {record.subtitle}
                    </td>
                    <td className="px-4 py-4 space-x-2">
                      <ViewCategoryData data={record} />
                      <EditCategory data={record} refetch={refetch} />
                      <DeleteCategory refetch={refetch} data={record} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HandleDataLoading>
      </div>
    </div>
  );
};

export default ManageCategory;
