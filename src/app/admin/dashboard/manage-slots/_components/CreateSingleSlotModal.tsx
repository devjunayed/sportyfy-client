"use client";

import Modal from "@/components/Shared/Modal/Modal";
import Button from "@/components/UI/Button";
import { CirclePlus } from "lucide-react";
import React from "react";
import CreateSingleSlot from "./CreateSingleSlot";

interface TCreateSingleSlotModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSingleSlotModal = ({ isOpen, setIsOpen }: TCreateSingleSlotModal) => {
  return (
    <>
      <Button type="button" size="lg" onClick={() => setIsOpen(true)}>
        <CirclePlus size={18} /> Create Slot
      </Button>
      <Modal
        width={820}
        title="Create Single Slot"
        footer={false}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <CreateSingleSlot onCreated={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default CreateSingleSlotModal;
