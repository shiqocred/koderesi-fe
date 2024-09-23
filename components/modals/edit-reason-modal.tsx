"use client";

import React, { MouseEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { AlertCircle, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastError } from "../toast-error";
import { optionToast } from "@/lib/utils";

export const EditReasonModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const params = useSearchParams();

  const isModalOpen = isOpen && type === "edit-reason";

  const onApprove = async (e: MouseEvent) => {
    e.preventDefault();
    const body = {
      reason: data,
    };
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/superadmin/affiliate/updateReason/${params.get(
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
      toast.success("Reason berhasil di update");
      cookies.set("affiliateReq", "1");
      onClose();
    } catch (error: any) {
      console.log("[ERROR_UPDATE_REASON]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Reason gagal di update" error={error} t={t} />
        ),
        optionToast
      );
    }
  };

  return (
    <Modal
      title="Edit Alasan"
      description=""
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex gap-2 w-full">
        <p>Apakah anda yakin ingin mengubah alasan tersebut?</p>
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
