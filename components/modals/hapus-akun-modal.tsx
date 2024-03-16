"use client";

import React from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";

export const HapusAkunModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "delete-akun";

  return (
    <Modal
      title="Hapus Akun"
      description="Hapus akun secara permanen. Aksi ini tidak dapat dibatalkan, sisa kredit anda akan hangus"
      isOpen={isModalOpen}
      onClose={onClose}
      className="bg-red-500/70"
    >
      <div className="flex gap-2">
        <Button variant={"destructive"} onClick={onClose}>
          Hapus
        </Button>
        <Button variant={"outline"} onClick={onClose}>
          Batal
        </Button>
      </div>
    </Modal>
  );
};
