import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { BLINK_CHAT_API } from '@/config/constant';

const socket = io(BLINK_CHAT_API);

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!isConnected) {
      socket.connect();
    }
  }, [isConnected]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return { socket };
};

export default useSocket;
