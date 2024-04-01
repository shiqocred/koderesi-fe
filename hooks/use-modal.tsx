import { StoreApi, UseBoundStore, create } from "zustand";

export type ModalType =
  | "add-resi"
  | "delete-akun"
  | "save-manifest"
  | "add-transaction";
interface ManifestProps {
  waktu: string;
  tanggal: string;
  manifest: string;
  resiKode: string | string[];
}

interface UseModalProps {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, dataManifest?: ManifestProps) => void;
  onClose: () => void;
  dataManifest?: ManifestProps;
}

export const useModal: UseBoundStore<StoreApi<UseModalProps>> =
  create<UseModalProps>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type, dataManifest) => set({ isOpen: true, type, dataManifest }),
    onClose: () => set({ isOpen: false, type: null }),
  }));
