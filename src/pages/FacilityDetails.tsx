import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleFacilityQuery } from "../redux/api/dashboard/facilityApi";
import { Button, Divider } from "antd";
import { ArrowLeftOutlined, CalendarOutlined } from "@ant-design/icons";
import HandleDataLoading from "../components/ui/Shared/HandleDataLoading/HandleDataLoading";

const FacilityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: facility, isLoading } = useGetSingleFacilityQuery(id as string);


  return (
    <div className="mx-10">
      <Button
        onClick={() => navigate(-1)}
        type="primary"
        className="bg-[#1B1F3B] mt-4 ml-2 flex gap-2"
      >
        <ArrowLeftOutlined /> Back
      </Button>

      {/*content  */}
      <HandleDataLoading isLoading={isLoading} data={facility?.data}>

      <div className="w-full my-6">
        <div className="flex justify-between items-center gap-10 flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full mx-auto ">
            <img
              src={facility?.data?.image}
              className="w-full h-full rounded-lg "
            />
          </div>
          {/* texts */}
          <div className="lg:w-1/2 flex flex-col  ">
            <h1 className="text-2xl font-bold">{facility?.data?.name}</h1>
            <p className="py-6">{facility?.data?.description}</p>

            <div className="font-semibold text-xl mr-10 flex justify-between">
              <p>&#2547; {facility?.data?.pricePerHour} / Hour </p>
              <p className="text-base">Location: {facility?.data?.location} </p>
            </div>
            <Divider />
            <div className="flex-col flex items-center mt-4 justify-between lg:mx-20 gap-10 ">
              <Button className="bg-[#1B1F3B] text-white">
                <Link to={`/booking/${id}` } type="primary" className="">
                  Book Now <CalendarOutlined />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      </HandleDataLoading>
    </div>
  );
};

export default FacilityDetails;
