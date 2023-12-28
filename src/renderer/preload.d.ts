/* eslint-disable */
import { Channels } from 'main/preload';
import { exec } from  "child_process";

// All of the Node.js APIs are available in the preload process.


declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: string, args: any): void;
        on(
          channel: string,
          func: (...args: any) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: any) => void): void;
      };
    };
  }
 

}

export {};
