import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

const FacilityTab = () => {
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
                Description will be here
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-4">
            Reviews will be here
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default FacilityTab;
