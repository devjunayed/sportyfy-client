"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Column from "antd/es/table/Column";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/redux/api/dashboard/categoryApi";
import CreateCategory from "../manage-category/components/CreateCategory"; 
import { CategoryDataType } from "@/types/category.type";
import ViewCategoryData from "../manage-category/components/ViewCategoryData"; 
import EditCategory from "../manage-category/components/EditCategory"; 
import DeleteCategory from "../manage-category/components/DeleteCategory"; 
import Modal from "antd/es/modal/Modal";
import { Table } from "antd";
import { Button } from "antd";
import { Image } from "antd";
import { Space } from "antd";


const ManageCategory = () => {
  const {
    data ,
    refetch,
    isLoading,
  } = useGetCategoriesQuery("");
  console.log({fromMange: data});
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-20 overflow-y-hidden">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-xl font-bold">Manage Category</h1>
        <Button
          onClick={() => setIsOpen(true)}
          size="large"
          className="text-white justify "
        >
          <PlusCircleFilled /> Add Category
        </Button>
        <Modal
          centered
          width={820}
          title="Add Category"
          footer={false}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
        >
          <CreateCategory setIsOpen={setIsOpen} />
        </Modal>
      </div>
      <div className="    h-[80vh]">
        <HandleDataLoading loadingOnly data={data?.data} isLoading={isLoading}>
          <Table
            sticky
            scroll={{ y: 500 }}
            dataSource={data?.data || []}
            className="  overflow-x-auto"
          >
            <Column
              title="No."
              key="serial"
              width={60}
              render={(_, __, index) => <>{index + 1}</>}
            />
            <Column
              title="Image"
              dataIndex="image"
              key="image"
              render={(image) => (
                <Image src={image} alt="faicility" width={50} />
              )}
            />
            <Column title="Category title" dataIndex="title" key="title" />
            <Column
              title="Category subtitle"
              dataIndex="subtitle"
              key="subtitle"
            />

            <Column
              title="Action"
              key="action"
              render={(_: any, record: CategoryDataType) => {
                return (
                  <Space size="middle">
                    <ViewCategoryData data={record} />
                    <EditCategory data={record} refetch={refetch} />
                    <DeleteCategory refetch={refetch} data={record} />
                  </Space>
                );
              }}
            />
          </Table>
        </HandleDataLoading>
      </div>
    </div>
  );
};

export default ManageCategory;
