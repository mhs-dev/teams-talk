"use client";

import ClientOnly from "../client-only";
import CreateServerModal from "../modals/create-server-modal";

export default function ModalProvider() {
  return (
    <ClientOnly>
      <CreateServerModal />
    </ClientOnly>
  )
}