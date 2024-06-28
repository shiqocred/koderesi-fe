"use client";

import { AddResiModal } from "@/components/modals/add-resi-modal";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { AddUserModal } from "@/components/modals/add-user-modal";
import { ApproveAffiliateModal } from "@/components/modals/approve-affiliate-modal";
import { ApproveWithdrawModal } from "@/components/modals/approve-withdraw-modal";
import { ArchiveResiModal } from "@/components/modals/archive-resi-modal";
import { DeleteChatModal } from "@/components/modals/delete-chat-modal";
import { DeleteManifestModal } from "@/components/modals/delete-manifest-modal";
import { DeleteResiModal } from "@/components/modals/delete-resi-modal";
import { DeleteTicketModal } from "@/components/modals/delete-ticket-modal";
import { DeleteUserModal } from "@/components/modals/delete-user-modal";
import { EditChatModal } from "@/components/modals/edit-chat-modal";
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
    </>
  );
};

export default ModalProvider;
