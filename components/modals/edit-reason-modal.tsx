"use client";

import React, { FormEvent, MouseEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { AlertCircle, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastError } from "../toast-error";
import { baseUrl, optionToast } from "@/lib/utils";

export const EditReasonModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const params = useSearchParams();

  const isModalOpen = isOpen && type === "edit-reason";

  const onApprove = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      reason: data,
    };
    try {
      await axios.put(
        `${baseUrl}/superadmin/affiliate/updateReason/${params.get("ca")}`,
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
      <form onSubmit={onApprove} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin mengubah alasan tersebut?</p>
        <div className="flex gap-2 w-full">
          <Button
            onClick={onClose}
            type="button"
            className="w-full dark:text-white border border-green-300 hover:border-green-400 dark:border-green-700/70 dark:hover:border-green-700 bg-transparent hover:bg-transparent text-black"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-300 text-black"
          >
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};
