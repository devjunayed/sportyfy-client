import { Card } from "antd";
import { FacilitiesDataType } from "../../../../pages/admin/ManageFacility";
import { useState } from "react";
import { formattedPrice } from "../../../../utils/formattedPrice";

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
      <div className="flex justify-between">
        <Card.Meta title={facility.name} />
       
            <span className="flex  text-gray-700">
              {formattedPrice(facility.pricePerHour)} / PH
            </span>
         
      </div>
      <Card.Meta
          description={
            <span className="flex mt-2 ">
              {facility.location}
            </span>
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
