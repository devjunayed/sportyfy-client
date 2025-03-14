/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Space, Table } from "antd";
import { useGetFacilitiesQuery } from "../../redux/api/dashboard/facilityApi";
import Column from "antd/es/table/Column";
import EditFacilities from "../../components/admin/EditFacilities";
import DeleteFacilities from "../../components/admin/DeleteFacilities";
import HandleDataLoading from "../../components/ui/Shared/HandleDataLoading/HandleDataLoading";

export interface FacilitiesDataType {
    _id: string;
    image: string;
    name: string;
    description: string;
    location: string;
    pricePerHour: number;
  }

const ManageFacility = () => {
  const { data=[], refetch, isLoading } = useGetFacilitiesQuery("");
  return (
    <div>
      <HandleDataLoading loadingOnly data={data.data} isLoading={isLoading}>

      <Table dataSource={data.data} className=" mt-20 overflow-x-auto">
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

        <Column
          title="Facility Description"
          dataIndex="description"
          key="facility"
        />
        <Column
          title="Location"
          dataIndex="location"
          key="location"
        />
        <Column
          title="PPH"
          dataIndex="pricePerHour"
          key="price perHour"
        />

         <Column
          title="Action"
          key="action"
          render={(_: any, record: FacilitiesDataType) => {
            return (
              <Space size="middle">
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
