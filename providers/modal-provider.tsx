"use client";

import { AddKreditModal } from "@/components/modals/add-kredit-modal";
import { AddLabelModal } from "@/components/modals/add-label-modal";
import { AddPromoModal } from "@/components/modals/add-promo-modal";
import { AddResiModal } from "@/components/modals/add-resi-modal";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { AddUserModal } from "@/components/modals/add-user-modal";
import { ApproveAffiliateModal } from "@/components/modals/approve-affiliate-modal";
import { ApproveWithdrawModal } from "@/components/modals/approve-withdraw-modal";
import { ArchiveResiModal } from "@/components/modals/archive-resi-modal";
import { DeleteChatModal } from "@/components/modals/delete-chat-modal";
import { DeleteKreditModal } from "@/components/modals/delete-kredit-modal";
import { DeleteAccountModal } from "@/components/modals/delete-label-account";
import { DeleteLabelModal } from "@/components/modals/delete-label-modal";
import { DeleteManifestModal } from "@/components/modals/delete-manifest-modal";
import { DeletePromoModal } from "@/components/modals/delete-promo-modal";
import { DeleteResiModal } from "@/components/modals/delete-resi-modal";
import { DeleteTicketModal } from "@/components/modals/delete-ticket-modal";
import { DeleteUserModal } from "@/components/modals/delete-user-modal";
import { EditChatModal } from "@/components/modals/edit-chat-modal";
import { EditKreditModal } from "@/components/modals/edit-kredit-modal";
import { EditLabelModal } from "@/components/modals/edit-label-modal";
import { EditPromoModal } from "@/components/modals/edit-promo-modal";
import { EditTicketModal } from "@/components/modals/edit-ticket-modal";
import { EditUserModal } from "@/components/modals/edit-user-modal";
import { HapusAkunModal } from "@/components/modals/hapus-akun-modal";
import { RejectedAffiliateModal } from "@/components/modals/rejected-affiliate-modal";
import { RejectedWithdrawModal } from "@/components/modals/rejected-withdraw-modal";
import { SaveManifestModal } from "@/components/modals/save-manifest-modal";
import { UnArchiveResiModal } from "@/components/modals/unarchive-resi-modal";

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
      <DeleteResiModal />
      <ArchiveResiModal />
      <UnArchiveResiModal />
      <DeleteUserModal />
      <EditUserModal />
      <DeleteManifestModal />
      <EditTicketModal />
      <EditChatModal />
      <DeleteChatModal />
      <DeleteTicketModal />
      <AddLabelModal />
      <EditLabelModal />
      <DeleteLabelModal />
      <AddKreditModal />
      <EditKreditModal />
      <DeleteKreditModal />
      <AddPromoModal />
      <EditPromoModal />
      <DeletePromoModal />
      <DeleteAccountModal />
    </>
  );
};

export default ModalProvider;
