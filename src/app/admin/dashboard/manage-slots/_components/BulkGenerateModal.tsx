"use client";

import Modal from "@/components/Shared/Modal/Modal";
import Button from "@/components/UI/Button";
import React from "react";
import { RiAiGenerate } from "react-icons/ri";
import BulkGenerate from "./BulkGenerate";

interface TBulkGenerateModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkGenerateModal = ({ isOpen, setIsOpen }: TBulkGenerateModal) => {
  return (
    <>
      <Button type="button" size="lg" onClick={() => setIsOpen(true)}>
        <RiAiGenerate /> Bulk Generate
      </Button>
      <Modal
        width={820}
        title="Bulk Generate"
        footer={false}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <BulkGenerate />
      </Modal>
    </>
  );
};

export default BulkGenerateModal;
