import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FacilitiesDataType } from "../../../pages/admin/ManageFacility";
import { Button, Input,  Rate } from "antd";
import FacilityRatingProgress from "./FacilityRatingProgress";
import { FaPaperPlane } from "react-icons/fa6";
// import "react-tabs/style/react-tabs.css";

const FacilityTab = ({ facility }: { facility: FacilitiesDataType }) => {
  return (
    <div className="my-10">
      {" "}
      <Tabs>
        <TabList className="w-full gap-4 border-b py-4 border-gray-300 text-gray-400 font-bold justify-center flex bottom-1">
          <Tab className="border-none outline-none cursor-pointer">
            Description
          </Tab>
          <Tab className="border-none outline-none cursor-pointer">
            Reviews(0)
          </Tab>
        </TabList>

        <TabPanel>
          <div className="mt-4">
            {/* Render the HTML content as JSX */}

            <div
              dangerouslySetInnerHTML={{ __html: facility.description }}
            ></div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-4">
            {/* Reviews overview */}
            <div className="flex w-full flex-nowrap text-nowrap items-center  gap-20 ">
              <div className="text-center space-y-2 border-r pr-20 ">
                <h3 className="font-bold text-xl">4.0</h3>
                <p>
                  <Rate disabled value={4} className="text-[#1B1F3B]" />
                </p>
                <p>35k ratings</p>
              </div>
              <div className="w-full">
                <FacilityRatingProgress
                  percent={20}
                  ratings={5}
                  reviews="20k"
                />
                <FacilityRatingProgress
                  percent={40}
                  ratings={4}
                  reviews="20k"
                />
                <FacilityRatingProgress
                  percent={10}
                  ratings={3}
                  reviews="20k"
                />
                <FacilityRatingProgress
                  percent={25}
                  ratings={2}
                  reviews="20k"
                />
                <FacilityRatingProgress percent={5} ratings={1} reviews="20k" />
              </div>
            </div>

            {/* Reviews Data */}
            <div className="text-center my-20">No Reviews yet</div>
            {/* Write Reviews */}
            <div className="w-full">
              <Input.TextArea placeholder="Write Your Review ...." />
              <Rate className="mt-4 text-center w-full" />
              <div className="w-full flex justify-center">
                
              <Button className="mt-4 w-40 mx-auto text-white text-center  ">
                <FaPaperPlane /> Submit
              </Button>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default FacilityTab;
