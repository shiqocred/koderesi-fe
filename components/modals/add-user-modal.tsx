"use client";

import React from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const AddUserModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "add-user";

  return (
    <Modal
      title="Tambah User Baru"
      description="Tambah user baru disini"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2 md:gap-4 md:mt-4">
        <div className="flex flex-col gap-1 w-full">
          <Label>Nama Lengkap</Label>
          <Input className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label>Email</Label>
          <Input className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label>Password</Label>
          <Input className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          className="w-full bg-green-400 hover:bg-green-500 text-gray-900"
          onClick={onClose}
        >
          Tambah
        </Button>
        <Button variant={"outline"} onClick={onClose} type="button">
          Batal
        </Button>
      </div>
    </Modal>
  );
};
