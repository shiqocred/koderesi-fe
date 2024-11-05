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
import { ToastError } from "../toast-error";
import { baseUrl, optionToast } from "@/lib/utils";

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
        `${baseUrl}/superadmin/affiliate/update/${params.get("ca")}`,
        body,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Affiliate berhasil di reject");
      cookies.set("affiliateReq", "arjct");
      onClose();
    } catch (error: any) {
      console.log("[ERROR_RJCT_AFFILIATE]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Affiliate gagal di reject" error={error} t={t} />
        ),
        optionToast
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
