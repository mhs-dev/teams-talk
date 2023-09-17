"use client";
import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export default function MediaRoom({ chatId, video, audio }: MediaRoomProps) {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.lastName || !user?.firstName) return;
    const name = `${user.firstName} ${user.lastName}`;
    (async function() {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await res.json();
        setToken(data?.token ?? "");
      } catch (err) {
        console.log(err);
      }
    })()
  }, [chatId, user?.firstName, user?.lastName])

  if (token === "") return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <Loader2 className='w-7 h-7 text-zinc-500 animate-spin my-4' />
      <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
    </div>
  )
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}