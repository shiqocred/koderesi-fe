"use client";

import { AddResiModal } from "@/components/modals/add-resi-modal";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { AddUserModal } from "@/components/modals/add-user-modal";
import { ApproveAffiliateModal } from "@/components/modals/approve-affiliate-modal";
import { ApproveWithdrawModal } from "@/components/modals/approve-withdraw-modal";
import { HapusAkunModal } from "@/components/modals/hapus-akun-modal";
import { RejectedAffiliateModal } from "@/components/modals/rejected-affiliate-modal";
import { RejectedWithdrawModal } from "@/components/modals/rejected-withdraw-modal";
import { SaveManifestModal } from "@/components/modals/save-manifest-modal";

const ModalProvider = () => {
  return (
    <>
      <AddResiModal />
      <HapusAkunModal />
      <SaveManifestModal />
      <AddTransactionModal />
      <ApproveAffiliateModal />
      <RejectedAffiliateModal />
      <ApproveWithdrawModal />
      <RejectedWithdrawModal />
      <AddUserModal />
    </>
  );
};

export default ModalProvider;
