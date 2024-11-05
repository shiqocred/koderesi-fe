"use client";

import { FormEvent } from "react";
import { Modal } from "./modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { AlertCircle, X } from "lucide-react";
import { ToastError } from "../toast-error";
import { baseUrl, optionToast } from "@/lib/utils";

export const DeleteResiModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { trackId } = useParams();
  const cookies = useCookies();
  const token = cookies.get("accessToken");
  const router = useRouter();
  const pathname = usePathname();

  const isModalOpen = isOpen && type === "delete-resi";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(
        `${baseUrl}/${
          pathname.includes("admin") ? "superadmin" : "admin"
        }/waybill/destroy/${trackId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resi berhasil dihapus");
      onClose();
      router.push(pathname.includes("admin") ? "/admin/tracks" : "/tracks");
    } catch (error: any) {
      console.log("[ERROR_DELETE_RESI]:", error);
      toast.custom(
        (t) => <ToastError label="Resi gagal dihapus." error={error} t={t} />,
        optionToast
      );
    }
  };

  return (
    <Modal
      title="Hapus Resi"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus resi ini?</p>
        <div className="flex w-full gap-2">
          <Button
            className="w-full bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent text-black dark:text-white border border-green-200 hover:border-green-400 dark:border-green-200/40 dark:hover:border-green-400"
            onClick={onClose}
            type="button"
          >
            Batal
          </Button>
          <Button variant={"destructive"} onClick={onDelete}>
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};
