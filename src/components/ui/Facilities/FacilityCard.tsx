import { Button } from "antd";
import { FacilitiesDataType } from "../../../pages/admin/ManageFacility";
import { Link } from "react-router-dom";

const FacilityCard = ({ _id, name, images, pricePerHour, location }: FacilitiesDataType) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col transition-transform duration-200 hover:scale-105 w-full sm:w-72">
      <img src={images[0]} alt={name} className="h-48 w-full object-cover" />
      
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
        <p className="text-sm text-gray-600 mt-1 truncate"> 
          <span className="font-medium">Location:</span> {location}
        </p>
        <p className="text-sm text-gray-700 mt-1 font-medium">
          {pricePerHour} <span className="font-bold">&#2547;</span> / hour
        </p>
      </div>
      
      <div className="p-4 flex justify-center">
        <Button type="primary" className="w-full">
          <Link to={`/facility/${_id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default FacilityCard;