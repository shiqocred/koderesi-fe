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
      <form onSubmit={onDelete} className="flex flex-col">
        <div className="flex flex-col gap-1">
          <p>Apakah anda yakin ingin menghapus label ini?</p>
          <p className="text-sm text-gray-700">
            <span className="font-bold">Data Pribadi</span> dan{" "}
            <span className="font-bold">sisa Kredit</span> akan dihapus secara
            permanen
          </p>
        </div>
        <div className="flex gap-2 mt-10">
          <Button
            className="w-full"
            variant={"outline"}
            type="button"
            onClick={onClose}
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
