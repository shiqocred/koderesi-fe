"use client";

import React, { MouseEvent, useState } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useCookies } from "next-client-cookies";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { AlertCircle, X } from "lucide-react";

export const RejectedAffiliateModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "reject-affiliate";

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const params = useSearchParams();
  const [reason, setReason] = useState("");

  const onReject = async (e: MouseEvent) => {
    e.preventDefault();
    const body = {
      status: "rejected",
      reason: reason,
    };
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate/update/${params.get(
          "ca"
        )}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Affiliate berhasil di reject");
      cookies.set("affiliateReq", "added");
      onClose();
    } catch (error: any) {
      console.log("[ERROR_RJCT_AFFILIATE]:", error);
      toast.custom(
        (t) => (
          <div className="flex gap-3 relative w-full items-center">
            <div className="flex gap-3 w-full">
              <AlertCircle className="w-4 h-4 dark:fill-white dark:text-red-800 text-red-500" />
              <div className="flex flex-col gap-1">
                <h5 className="font-medium dark:text-white text-sm leading-none text-red-500">
                  Affiliate gagal di reject
                </h5>
                {error.response.data.message && (
                  <ul className="*:before:content-['-'] *:before:pr-3 dark:text-red-200 text-xs text-red-400">
                    <li>{error.response.data.message}</li>
                  </ul>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="w-5 h-5 z-50 text-white flex-none bg-red-500 ml-auto flex items-center justify-center rounded-full hover:scale-110 transition-all shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ),
        {
          duration: 30000,
          classNames: {
            toast:
              "group-[.toaster]:dark:bg-red-800 group-[.toaster]:bg-red-50 group-[.toaster]:border-red-300 group-[.toaster]:dark:text-white group-[.toaster]:w-full group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:rounded-md",
          },
        }
      );
    }
  };

  return (
    <Modal
      title="Tolak Affiliate"
      description="Konfirmasi jika anda tidak menyetujui pengajuan."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div>
        <Label>Pesan</Label>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="bg-transparent disabled:opacity-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-green-200 focus-visible:border-green-400 placeholder:text-gray-500 hover:border-green-400 dark:border-green-200/40 dark:focus-visible:border-green-400 dark:hover:border-green-400"
        />
      </div>
      <div className="flex gap-2 w-full mt-4">
        <Button
          onClick={onClose}
          className="w-full border dark:text-white border-green-300 hover:border-green-400 dark:border-green-700/70 dark:hover:border-green-700 bg-transparent hover:bg-transparent text-black"
        >
          Batal
        </Button>
        <Button
          onClick={onReject}
          disabled={!reason}
          className="w-full"
          variant={"destructive"}
        >
          Reject
        </Button>
      </div>
    </Modal>
  );
};
