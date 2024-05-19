import { StoreApi, UseBoundStore, create } from "zustand";

export type ModalType =
  | "add-resi"
  | "delete-akun"
  | "save-manifest"
  | "add-transaction"
  | "reject-affiliate"
  | "approve-affiliate"
  | "reject-withdraw"
  | "approve-withdraw"
  | "add-user"
  | "delete-resi"
  | "archive-resi"
  | "unarchive-resi"
  | "delete-user"
  | "edit-user"
  | "delete-manifest";
interface ManifestProps {
  waktu: string;
  tanggal: string;
  manifest: string;
  resiKode: string | string[];
}

interface UseModalProps {
  data: string;
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (
    type: ModalType,
    data?: string,
    dataManifest?: ManifestProps
  ) => void;
  onClose: () => void;
  dataManifest?: ManifestProps;
}

export const useModal: UseBoundStore<StoreApi<UseModalProps>> =
  create<UseModalProps>((set) => ({
    data: "",
    type: null,
    isOpen: false,
    onOpen: (type, data, dataManifest) =>
      set({ isOpen: true, type, data, dataManifest }),
    onClose: () => set({ isOpen: false, type: null }),
  }));
