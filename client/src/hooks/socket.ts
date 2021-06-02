// @ts-nocheck
import { inject } from "vue";
import io, { Socket } from "socket.io-client";

export function useConnect() {
  const socket = inject<Socket>("socket");

  socket.on("connect", () => {
    console.log("connect", socket);
  });
}

// export function useSocketName(socket) {
//   const name = ref("");

//   socket.on("name", (serverName) => {
//     name.value = serverName;
//   });

//   function setDisplayName(value) {
//     socket.emit("updateName", value);
//   }

//   return [name, setDisplayName];
// }
