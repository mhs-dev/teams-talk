"use client";

import ClientOnly from "../client-only";
import CreateChannelModal from "../modals/create-channel-modal";
import CreateServerModal from "../modals/create-server-modal";
import DeleteChannelModal from "../modals/delete-channel-modal";
import DeleteServerModal from "../modals/delete-server-modal";
import EditChannelModal from "../modals/edit-channel-modal";
import EditServerModal from "../modals/edit-server-modal";
import InviteModal from "../modals/invite-modal";
import LeaveServerModal from "../modals/leave-server-modal";
import MembersModal from "../modals/members-modal";
import MessageFileModal from "../modals/message-file-modal";

export default function ModalProvider() {
  return (
    <ClientOnly>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </ClientOnly>
  )
}