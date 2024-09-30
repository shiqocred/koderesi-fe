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

export const DeleteChatModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const isModalOpen = isOpen && type === "delete-chat";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://koderesi.raventech.my.id/api/${
          data.isAdmin ? "superadmin" : "admin"
        }/support/deleteChat/${data.id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Chat berhasil dihapus");
      cookies.set("chat updated", "1");
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[ERROR_DELETE_Chat]:", error);
      toast.custom(
        (t) => <ToastError label="Chat gagal dihapus" error={error} t={t} />,
        optionToast
      );
    }
  };

  return (
    <Modal
      title="Hapus Chat"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus chat ini?</p>
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
