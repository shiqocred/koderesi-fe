"use client";

import { FormEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { ToastError } from "../toast-error";
import { baseUrl, optionToast } from "@/lib/utils";

export const DeleteKreditModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const isModalOpen = isOpen && type === "delete-credit";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`${baseUrl}/superadmin/price/destroy/${data}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Harga Kredit Berhasil Dihapus");
      cookies.set("kredit updated", "1");
      onClose();
    } catch (error) {
      toast.custom(
        (t) => (
          <ToastError label="Harga Kredit Gagal Dihapus" error={error} t={t} />
        ),
        optionToast
      );
      console.log("[ERROR_KREDIT_DELETE]:", error);
    }
  };

  return (
    <Modal
      title="Hapus Harga Kredit"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus harga kredit ini?</p>
        <div className="flex w-full gap-2">
          <Button
            className="w-full bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent text-black dark:text-white border border-green-200 hover:border-green-400 dark:border-green-200/40 dark:hover:border-green-400"
            onClick={onClose}
            type="button"
          >
            Batal
          </Button>
          <Button variant={"destructive"} type="submit">
            Hapus
          </Button>
        </div>
      </form>
    </Modal>
  );
};
