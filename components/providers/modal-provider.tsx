"use client";

import ClientOnly from "../client-only";
import CreateServerModal from "../modals/create-server-modal";
import EditServerModal from "../modals/edit-server-modal";
import InviteModal from "../modals/invite-modal";

export default function ModalProvider() {
  return (
    <ClientOnly>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </ClientOnly>
  )
}