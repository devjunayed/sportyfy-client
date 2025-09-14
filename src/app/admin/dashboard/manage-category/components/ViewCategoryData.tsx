import { EyeFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { CategoryDataType } from "../../../types/category.type";

const ViewCategoryData = ({ data }: { data: CategoryDataType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <EyeFilled />
      </button>
      <Modal
        onCancel={() => setIsOpen(false)}
        title={"Category Details"}
        footer={false}
        open={isOpen}
      >
        <div className="flex items-center justify-center">

        <img src={data.image} alt="" />
        </div>

        <h1 className="text-lg font-bold">{data.title}</h1>

        {/* short Descrition */}
        <p className="text-black">{data.subtitle}</p>
        {/* description */}
      </Modal>
    </div>
  );
};

export default ViewCategoryData;
