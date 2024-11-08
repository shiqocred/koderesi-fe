"use client";

import { FormEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { baseUrl } from "@/lib/utils";

export const UnArchiveResiModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();

  const isModalOpen = isOpen && type === "unarchive-resi";

  const onArchive = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `${baseUrl}/admin/archive/unarchive/${data}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resi berhasil membatalkan pengarsipan");
      onClose();
      router.refresh();
      router.push("/tracks");
    } catch (error) {
      console.log("[ERROR_UNARCHIVE_RESI]:", error);
      toast.error("Resi gagal membatalkan pengarsipan");
    }
  };

  return (
    <Modal
      title="Pembatalkan Pengarsipan Resi"
      description=""
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin membatalkan pengarsipan resi ini?</p>
        <div className="flex w-full gap-2">
          <Button
            className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent text-black dark:text-white border border-green-200 hover:border-green-400 dark:border-green-200/40 dark:hover:border-green-400 w-full "
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            className="bg-green-400 hover:bg-green-300 dark:bg-green-500 hover:dark:bg-green-400 text-black w-full "
            onClick={onArchive}
          >
            Batalkan Pengarsipan
          </Button>
        </div>
      </div>
    </Modal>
  );
};
