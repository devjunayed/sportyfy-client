import { Button, Modal } from "antd";
import CreateSingleSlot from "./CreateSingleSlot";
import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";

interface TCreateSingleSlotModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSingleSlotModal = ({ isOpen, setIsOpen }: TCreateSingleSlotModal) => {
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        size="large"
        className="text-white justify "
      >
        <PlusCircleFilled /> Create Slot
      </Button>
      <Modal
        centered
        width={820}
        title="Create Single Slot"
        footer={false}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <CreateSingleSlot />
      </Modal>
    </div>
  );
};

export default CreateSingleSlotModal;
