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
export interface ManifestProps {
  note: string;
  status: string;
  waybill_id: string;
  date_manifest: string;
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
    dataManifest: {
      note: "",
      status: "",
      waybill_id: "",
      date_manifest: "",
    },
    onOpen: (type, data, dataManifest) =>
      set({ isOpen: true, type, data, dataManifest }),
    onClose: () => set({ isOpen: false, type: null }),
  }));
