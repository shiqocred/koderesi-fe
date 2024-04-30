"use client";

import React from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { ChevronDown } from "lucide-react";

export const ApproveWithdrawModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "approve-withdraw";

  return (
    <Modal
      title="Konfirmasi Affiliate"
      description="Konfirmasi jika anda menyetujui pengajuan."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex gap-2 md:gap-4 mt-4 mb-2 flex-col md:flex-row">
        <div className="flex flex-col gap-1 w-full">
          <Label>No. Transaksi</Label>
          <Input className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label>Transaksi via</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-transparent dark:bg-transparent border-green-200 border hover:border-green-400 text-white justify-between">
                Choose...
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandGroup>
                  <CommandList>
                    <CommandItem>A</CommandItem>
                    <CommandItem>B</CommandItem>
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 mb-6 flex-col md:flex-row">
        <div className="flex flex-col gap-1 w-full">
          <Label>Tanggal</Label>
          <Input className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label>Waktu</Label>
          <Input className="bg-transparent dark:bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400" />
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 w-full">
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
