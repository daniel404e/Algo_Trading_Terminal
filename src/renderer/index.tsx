/* eslint-disable */
import { createRoot } from 'react-dom/client';
import App from './App';
 


 

 

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <App />
  );

// calling IPC exposed from preload script
// console.log("helllllllllllllllllllllo");

// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
   
   
   
// });

// window.electron.ipcRenderer.sendMessage('ipc-example',  ["messadge"]);

// window.electron.ipcRenderer.on('screens2', (message) => {
   

//   console.log(message);
//  // console.log(message);
  

     
// })

