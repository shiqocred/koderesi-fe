"use client";

import { FormEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";

export const EditAdminPersonalModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const isModalOpen = isOpen && type === "edit-admin-personal";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://koderesi.raventech.my.id/api/superadmin/profile/update-profile`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Data diri berhasil diupdate");
      cookies.set("update profile", "1");
      onClose();
    } catch (error) {
      console.log("[ERROR_EDITED_PROFILE]:", error);
      toast.error("Data diri gagal diupdate");
    }
  };

  return (
    <Modal
      title="Update Data diri"
      description=""
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin mengubah data diri anda?</p>
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
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
};
