import { Card } from "antd";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import { useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";

const FacilityCard = ({ facility }: { facility: FacilitiesDataType }) => {
  const [bgImg, setBgImg] = useState(facility.images[0]);
  return (
    <Card
      onMouseEnter={() =>
        facility.images.length > 1 && setBgImg(facility.images[1])
      }
      onMouseLeave={() => setBgImg(facility.images[0])}
      key={facility._id}
      cover={
        <div
          className={` h-44 w-full bg-cover transition-all duration-700 ease-in-out`}
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div>
      }
      hoverable
    >
      <div className="flex gap-4 w-full justify-between">
        <Card.Meta title={facility.name} />
      </div>
      <Card.Meta
        description={
          <>
            <span className="flex items-center gap-2 mt-2  text-gray-700">
             <TbCurrencyTaka /> {facility.pricePerHour} / PH
            </span>
            <span className="flex   items-center gap-2">
              <BiLocationPlus /> {facility.location}
            </span>
          </>
        }
      />
      <div className="flex justify-center">
        <button className=" w-1/2 mt-4 border bg-gray-800 text-white py-1 rounded-md text-center">
          Book Now
        </button>
      </div>
    </Card>
  );
};

export default FacilityCard;
