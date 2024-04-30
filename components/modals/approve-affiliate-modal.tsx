"use client";

import React from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";

export const ApproveAffiliateModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "approve-affiliate";

  return (
    <Modal
      title="Konfirmasi Affiliate"
      description="Konfirmasi jika anda menyetujui pengajuan."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex gap-2 w-full">
        <Button
          onClick={onClose}
          className="w-full dark:text-white border border-green-300 hover:border-green-400 dark:border-green-700/70 dark:hover:border-green-700 bg-transparent hover:bg-transparent text-black"
        >
          Batal
        </Button>
        <Button
          onClick={onClose}
          className="w-full bg-green-400 hover:bg-green-300 text-black"
        >
          Approve
        </Button>
      </div>
    </Modal>
  );
};
