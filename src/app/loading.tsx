import { Spin } from "antd";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
};

export default loading;
