"use client";
import { Button, Modal } from "antd";
import BulkGenerate from "./BulkGenerate";
import React from "react";
import { RiAiGenerate } from "react-icons/ri";

interface TBulkGenerateModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkGenerateModal = ({ isOpen, setIsOpen }: TBulkGenerateModal) => {
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        size="large"
        className="text-white justify "
      >
        <RiAiGenerate /> Bulk Generate
      </Button>
      <Modal
        centered
        width={820}
        title="Bulk Generate"
        footer={false}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <BulkGenerate />
      </Modal>
    </div>
  );
};

export default BulkGenerateModal;
