"use client";

import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { Separator } from "../ui/separator";

export const AccountModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "akun";

  return (
    <Modal
      title="Akun"
      description="Manage akun"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div>
        <div>atas</div>
        <Separator />
        <div>kredit</div>
        <Separator />
        <div>menu profile</div>
        <div>menu contact</div>
        <Separator />
        <div>logout</div>
      </div>
    </Modal>
  );
};
