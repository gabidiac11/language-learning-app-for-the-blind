import { useEffect, useRef, useState } from "react";

export const useIsPlayingMessage = (messageUniqueName: string) => {
  const [isPlaying, setIsPlaying] = useState<boolean>();

  useEffect(() => {
    const eventName = `started-playing-message-${messageUniqueName}-app`;
    const listen = (e: any) => {
      console.log(`Received event '${eventName}'`);

      setIsPlaying(true);
    };
    document.addEventListener(eventName, listen);

    return () => {
      document.removeEventListener(eventName, listen);
    };
  }, [messageUniqueName]);

  useEffect(() => {
    const eventName = `stopped-playing-message-${messageUniqueName}-app`;

    const listen = (e: any) => {
      console.log(`Received event '${eventName}'`);
      setIsPlaying(false);
    };
    document.addEventListener(eventName, listen);

    return () => {
      document.removeEventListener(eventName, listen);
    };
  }, [messageUniqueName]);

  return isPlaying;
};
