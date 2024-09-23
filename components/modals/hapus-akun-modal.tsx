"use client";

import React, { FormEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ToastError } from "../toast-error";
import { optionToast } from "@/lib/utils";

export const HapusAkunModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "delete-account";

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();
  const pathname = usePathname();

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(
        `https://koderesi.raventech.my.id/api/admin/profile/destroy-profile`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Account berhasil dihapus");
      onClose();
      router.refresh();
      router.push("/auth/login");
    } catch (error) {
      console.log("[ERROR_DELETE_ACCOUNT]:", error);
      toast.custom(
        (t) => <ToastError label="Account gagal dihapus" error={error} t={t} />,
        optionToast
      );
    }
  };

  return (
    <Modal
      title="Hapus Akun"
      description="Hapus akun secara permanen. Aksi ini tidak dapat dibatalkan"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col">
          <p>Apakah andayakin ingin menghapus label ini?</p>
          <p className="text-sm text-gray-700">
            Data Pribadi dan sisa Kredit akan dihapus secara permanen
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="w-full" variant={"outline"} onClick={onClose}>
            Batal
          </Button>
          <Button variant={"destructive"} onClick={onClose}>
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};
