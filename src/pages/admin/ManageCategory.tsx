/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Image, Modal, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import HandleDataLoading from "../../components/ui/Shared/HandleDataLoading/HandleDataLoading";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/api/dashboard/categoryApi";
import CreateCategory from "../../components/admin/ManageCategory/CreateCategory";
import { CategoryDataType } from "../../types/category.type";
import ViewCategoryData from "../../components/admin/ManageCategory/ViewCategoryData";
import EditCategory from "../../components/admin/ManageCategory/EditCategory";
import DeleteCategory from "../../components/admin/ManageCategory/DeleteCategory";

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
