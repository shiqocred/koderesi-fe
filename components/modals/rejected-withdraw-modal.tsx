"use client";

import React from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const RejectedWithdrawModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "reject-withdraw";

  return (
    <Modal
      title="Tolak Withdraw"
      description="Konfirmasi jika anda tidak menyetujui withdraw."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div>
        <Label>Pesan</Label>
        <Textarea className="bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
      </div>
      <div className="flex gap-2 w-full mt-4">
        <Button
          onClick={onClose}
          className="w-full border dark:text-white border-green-300 hover:border-green-400 dark:border-green-700/70 dark:hover:border-green-700 bg-transparent hover:bg-transparent text-black"
        >
          Batal
        </Button>
        <Button onClick={onClose} className="w-full" variant={"destructive"}>
          Reject
        </Button>
      </div>
    </Modal>
  );
};
