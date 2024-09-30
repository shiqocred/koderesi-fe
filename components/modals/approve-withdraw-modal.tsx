"use client";

import React, { MouseEvent, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { useSearchParams } from "next/navigation";
import { ToastError } from "../toast-error";
import { cn, optionToast } from "@/lib/utils";

export const ApproveWithdrawModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "approve-withdraw";

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const params = useSearchParams();
  const [data, setData] = useState("");

  const onApprove = async (e: MouseEvent) => {
    e.preventDefault();
    const body = {
      status: "approved",
      transaction_number: data,
    };
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate/withdrawAccept/${params.get(
          "cw"
        )}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Withdraw berhasil di approve");
      cookies.set("affiliateReq", "withr");
      onClose();
    } catch (error: any) {
      console.log("[ERROR_APRV_WITHDRAW]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Withdraw gagal di approve" error={error} t={t} />
        ),
        optionToast
      );
    }
  };

  return (
    <Modal
      title="Konfirmasi Withdraw Affiliate"
      description="Konfirmasi jika anda menyetujui withdraw."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex gap-2 md:gap-4 mt-4 mb-2 flex-col md:flex-row">
        <div className="space-y-0.5 md:space-y-1 relative w-full">
          <Label
            className={cn(
              "absolute transition-all text-gray-700 dark:text-white/70 text-sm",
              data.length === 0
                ? "translate-y-3.5 left-3 font-normal"
                : "-translate-y-3 left-0 font-light"
            )}
          >
            No. Transaksi
          </Label>
          <Input
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="peer-hover:border-green-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-400 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-500 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400 border-0 rounded-none border-b bg-transparent dark:bg-transparent w-full disabled:opacity-100"
          />
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
          onClick={onApprove}
          className="w-full bg-green-400 hover:bg-green-300 text-black"
        >
          Approve
        </Button>
      </div>
    </Modal>
  );
};
