"use client";

import { AddResiModal } from "@/components/modals/add-resi-modal";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { HapusAkunModal } from "@/components/modals/hapus-akun-modal";
import { SaveManifestModal } from "@/components/modals/save-manifest-modal";

const ModalProvider = () => {
  return (
    <>
      <AddResiModal />
      <HapusAkunModal />
      <SaveManifestModal />
      <AddTransactionModal />
    </>
  );
};

export default ModalProvider;
