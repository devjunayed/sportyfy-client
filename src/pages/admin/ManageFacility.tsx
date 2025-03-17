/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Image, Modal, Space, Table } from "antd";
import { useGetFacilitiesQuery } from "../../redux/api/dashboard/facilityApi";
import Column from "antd/es/table/Column";
import DeleteFacilities from "../../components/admin/ManageFcility/DeleteFacilities";
import HandleDataLoading from "../../components/ui/Shared/HandleDataLoading/HandleDataLoading";
import ViewFacilitiesData from "../../components/admin/ManageFcility/ViewFacilitiesData";
import EditFacilities from "../../components/admin/ManageFcility/EditFacilities";
import { formattedPrice } from "../../utils/formattedPrice";
import { PlusCircleFilled } from "@ant-design/icons";
import CreateFacility from "./CreateFacility";
import { useState } from "react";

export interface FacilitiesDataType {
  _id: string;
  image: string;
  name: string;
  description: string;
  location: string;
  pricePerHour: number;
}

const ManageFacility = () => {
  const { data = [], refetch, isLoading } = useGetFacilitiesQuery("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-20 overflow-y-hidden">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-xl font-bold">Manage Facility</h1>
        <Button
          onClick={() => setIsOpen(true)}
          size="large"
          className="text-white justify "
        >
          <PlusCircleFilled /> Add Facility
        </Button>
        <Modal
          centered
          width={1048}
          title="Add Facility"
          footer={false}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
        >
          <CreateFacility />
        </Modal>
      </div>
      <div className="    h-[80vh]">
        <HandleDataLoading loadingOnly data={data.data} isLoading={isLoading}>
          <Table sticky scroll={{y: 500}}  dataSource={data.data} className="  overflow-x-auto">
          
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
            <Column title="Facility Name" dataIndex="name" key="name" />

            {/* <Column
          title="Facility Description"
          dataIndex="description"
          key="facility"
        /> */}
            <Column width={400} title="Location" dataIndex="location" key="location" />
            <Column
              title="PPH"
              render={(_: any, record: FacilitiesDataType) => {
                return (
                  <Space size="middle">
                    {formattedPrice(record.pricePerHour)}
                  </Space>
                );
              }}
              key="price perHour"
            />

            <Column
              title="Action"
              key="action"
              render={(_: any, record: FacilitiesDataType) => {
                return (
                  <Space size="middle">
                    <ViewFacilitiesData data={record} />
                    <EditFacilities data={record} refetch={refetch} />
                    <DeleteFacilities refetch={refetch} data={record} />
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

export default ManageFacility;
