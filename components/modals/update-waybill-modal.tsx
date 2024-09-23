"use client";

import { FormEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { ToastError } from "../toast-error";
import { optionToast } from "@/lib/utils";

export const UpdateWaybillModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const isModalOpen = isOpen && type === "update-waybill";

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/admin/waybill/update/${data}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resi berhasil di perbarui");
      cookies.set("update", "add");
      onClose();
    } catch (error: any) {
      console.log("[ERROR_UPDATE_RESI]:", error);
      toast.custom(
        (t) => (
          <ToastError label="Resi gagal di perbarui" error={error} t={t} />
        ),
        optionToast
      );
    }
  };

  return (
    <Modal
      title="Update Waybill"
      description=""
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onUpdate} className="w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <p>Apakah anda yakin ingin memeperbarui waybill?</p>
          <p className="text-sm text-gray-700">
            Tindakan ini dapat mengurangi kredit anda
          </p>
        </div>
        <div className="flex w-full gap-2">
          <Button
            className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent text-black dark:text-white border border-gray-200 hover:border-gray-400 dark:border-green-200/40 dark:hover:border-gray-400"
            onClick={onClose}
            type="button"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="w-full transition-all bg-transparent hover:bg-transparent dark:text-green-400 hover:underline font-normal text-green-700 border border-green-700 dark:border-green-400"
          >
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};