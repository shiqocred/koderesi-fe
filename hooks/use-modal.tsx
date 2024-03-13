import { StoreApi, UseBoundStore, create } from "zustand";

export type ModalType = "add-resi";

interface useModalProps {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal: UseBoundStore<StoreApi<useModalProps>> =
  create<useModalProps>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type }),
    onClose: () => set({ isOpen: false, type: null }),
  }));
