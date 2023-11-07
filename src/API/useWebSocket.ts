// import { useEffect, useState } from "react";

// const useWebSocket = (url: string, onMessage: (data: any) => void) => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     if (socket === null || socket.readyState === WebSocket.CLOSED) {
//       const newSocket = new WebSocket(url);

//       newSocket.addEventListener("open", async () => {
//         console.log("WebSocket is open");
//       });

//       newSocket.addEventListener("message", async (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           await onMessage(data);
//         } catch (error) {
//           console.error("Error parsing WebSocket message:", error);
//         }
//       });

//       newSocket.addEventListener("error", (errorEvent) => {
//         console.error("WebSocket error:", errorEvent);
//       });

//       newSocket.addEventListener("close", () => {
//         console.log("WebSocket is closed");
//       });

//       setSocket(newSocket);
//     }
//   }, [url, onMessage]);

//   return socket;
// };

// export default useWebSocket;
export {};