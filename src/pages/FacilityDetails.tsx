import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleFacilityQuery } from "../redux/api/dashboard/facilityApi";
import { Button, Divider } from "antd";
import { ArrowLeftOutlined, CalendarOutlined } from "@ant-design/icons";
import HandleDataLoading from "../components/ui/Shared/HandleDataLoading/HandleDataLoading";
import FacilitySlider from "../components/ui/FacilityDetails/FacilitySlider";
import { CiLocationOn } from "react-icons/ci";
import FacilityTab from "../components/ui/FacilityDetails/FacilityTab";

const FacilityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: facility, isLoading } = useGetSingleFacilityQuery(id as string);

  return (
    <div className="mx-10 mt-20">
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
          <div className="flex justify-between items-start gap-10 flex-col lg:flex-row">
            <div className="lg:w-1/2 w-full mx-auto ">
              <FacilitySlider images={facility?.data?.images as string[]} />
            </div>
            {/* texts */}
            <div className="lg:w-1/2 flex flex-col  ">
              <h1 className="text-2xl font-bold">{facility?.data?.name}</h1>
              <p className="text-base mt-4 flex items-center gap-2">
                <CiLocationOn /> {facility?.data?.location}{" "}
              </p>
              <p className="py-6">{facility?.data?.shortDescription}</p>

              <div className="font-semibold text-xl mr-10 flex justify-between">
                <p>&#2547; {facility?.data?.pricePerHour} / Hour </p>
              </div>
              <Divider />
              <div className="flex-col flex items-center mt-4 justify-between lg:mx-20 gap-10 ">
                <Button className="bg-[#1B1F3B] text-white">
                  <Link to={`/booking/${id}`} type="primary" className="">
                    Book Now <CalendarOutlined />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <FacilityTab facility={facility.data} />
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default FacilityDetails;
