'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIo } from 'socket.io-client';
import { Socket } from 'net';

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
})

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const socketIns = new (ClientIo as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: '/api/socket/io',
      transports: ['polling'] as any,
      addTrailingSlash: false
    });

    socketIns.on('connect', () => {
      setIsConnected(true);
    })

    socketIns.on('disconnect', () => {
      setIsConnected(false);
    })

    setSocket(socketIns);
    return () => {
      socketIns.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}