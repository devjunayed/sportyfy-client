/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Space, Table } from "antd";
import { useGetFacilitiesQuery } from "../../redux/api/dashboard/facilityApi";
import Column from "antd/es/table/Column";
import DeleteFacilities from "../../components/admin/ManageFcility/DeleteFacilities";
import HandleDataLoading from "../../components/ui/Shared/HandleDataLoading/HandleDataLoading";
import ViewFacilitiesData from "../../components/admin/ManageFcility/ViewFacilitiesData";
import EditFacilities from "../../components/admin/ManageFcility/EditFacilities";

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
  return (
    <div className="mt-20 overflow-y-scroll h-[85vh]">
      <HandleDataLoading loadingOnly data={data.data} isLoading={isLoading}>
        <Table dataSource={data.data} className="  overflow-x-auto">
          <Column
            title="No."
            key="serial"
            render={(_, __, index) => <>{index + 1}</>}
          />
          <Column
            title="Image"
            dataIndex="image"
            key="image"
            render={(image) => <Image src={image} alt="faicility" width={50} />}
          />
          <Column title="Facility Name" dataIndex="name" key="name" />

          {/* <Column
          title="Facility Description"
          dataIndex="description"
          key="facility"
        /> */}
          <Column title="Location" dataIndex="location" key="location" />
          <Column title="PPH" dataIndex="pricePerHour" key="price perHour" />

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
  );
};

export default ManageFacility;
