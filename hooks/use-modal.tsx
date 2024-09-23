import { StoreApi, UseBoundStore, create } from "zustand";

type PriceType =
  | "add-credit"
  | "edit-credit"
  | "delete-credit"
  | "add-promo"
  | "edit-promo"
  | "delete-promo";

type SupportType =
  | "edit-chat"
  | "delete-chat"
  | "edit-ticket"
  | "delete-ticket"
  | "add-label"
  | "edit-label"
  | "delete-label";

export type ModalType =
  | PriceType
  | SupportType
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
  | "delete-manifest"
  | "delete-account"
  | "edit-personal"
  | "edit-password"
  | "edit-admin-personal"
  | "edit-admin-password"
  | "update-waybill"
  | "edit-reason";

export interface LabelProps {
  id: string;
  name: string;
  color: string;
}
export interface ManifestProps {
  note: string;
  status: string;
  waybill_id: string;
  date_manifest: string;
}

interface UseModalProps {
  data: any;
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (
    type: ModalType,
    data?: any,
    dataManifest?: ManifestProps,
    dataLabel?: LabelProps
  ) => void;
  onClose: () => void;
  dataManifest?: ManifestProps;
  dataLabel?: LabelProps;
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
    dataLabel: {
      id: "",
      name: "",
      color: "",
    },
    onOpen: (type, data, dataManifest, dataLabel) =>
      set({ isOpen: true, type, data, dataManifest, dataLabel }),
    onClose: () => set({ isOpen: false, type: null }),
  }));
