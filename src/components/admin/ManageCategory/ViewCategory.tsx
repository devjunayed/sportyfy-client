import { EyeFilled } from "@ant-design/icons";
import { FacilitiesDataType } from "../../../pages/admin/ManageFacility";
import { Modal } from "antd";
import { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { formattedPrice } from "../../../utils/formattedPrice";
import parse from 'html-react-parser';

const ViewFacilitiesData = ({ data }: { data: FacilitiesDataType }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(data)
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <EyeFilled />
      </button>
      <Modal onCancel={()=> setIsOpen(false)} title={"Facility Details"} footer={false} open={isOpen}>
        <img src={data.images[0]} alt="" />
        <div className="flex mt-4 justify-between items-center">
          <h1 className="text-lg font-bold">{data.name}</h1>
          <span className="flex items-center">{formattedPrice(data.pricePerHour)} / hour</span>
        </div>
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <IoLocation /> {data.location}
        </span>
        {/* short Descrition */}
        <h1 className=" font-semibold  border-b pb-1 mt-4">Short Description</h1>
        <p className="text-black">{data.shortDescription}</p>
        {/* description */}
        <h1 className=" font-semibold  border-b pb-1 mt-4"> Description</h1>
        <p className="text-black">{parse(data.description)}</p>
      </Modal>
    </div>
  );
};

export default ViewFacilitiesData;
