"use client";

import AccountModal from "@/components/modals/account-modal";
import { AddResiModal } from "@/components/modals/add-resi-modal";
import { HapusAkunModal } from "@/components/modals/hapus-akun-modal";

const ModalProvider = () => {
  return (
    <>
      <AddResiModal />
      <HapusAkunModal />
    </>
  );
};

export default ModalProvider;
