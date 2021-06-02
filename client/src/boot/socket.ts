import { IMessage } from "./../interface";
//@ts-nocheck
import io, { Socket } from "socket.io-client";
import { Store as VuexStore } from "vuex";
import { StateInterface } from "src/store";

class IoService {
  socket: Socket | null = null;

  constructor() {}
  connect(store: VuexStore<StateInterface>) {
    const userId = store.state.user.user!.id;
    this.socket = io("/", {
      path: "/api/chat/im",
      query: {
        userId,
      },
    });
    console.log(this.socket);

    this.socket.on("connect", () => {
      console.log("socket 连接成功！");
      // 获取会话列表
      store.dispatch("user/doConversationList");
    });

    // 有新消息
    this.socket.on("new-message", (message: IMessage) => {
      // 处理消息， 加入 isSelf
      // 更改store
      const newMessage = message;
      newMessage.isMe = message.fromId === userId;
      const conversationList = store.state.user.conversationList;
      const idx = conversationList.findIndex(
        (co: any) => co.id === +newMessage.conversationId
      );
      if (idx !== -1) {
        store.commit("user/doMessageUpdate", { idx, message: newMessage });
      }
    });
  }

  sendMessage(message: any) {
    if (this.socket) {
      this.socket.emit("new-message", message);
    }
  }

  join(conversationId: number) {
    if (this.socket) {
      this.socket.emit("join", {
        conversationId,
      });
    }
  }
  disconnect() {
    this.socket?.disconnect();
  }
}

export default new IoService();
