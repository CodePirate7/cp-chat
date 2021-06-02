import { api } from "src/boot/axios";
import { IConversation } from "src/interface";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { UserStateInterface } from "./state";

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async doCurrentUser({ state }) {
    try {
      const res = await api.get("/users/currentuser");
      if (res.data.currentUser) {
        state.user = {
          ...res.data.currentUser,
        };
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  },

  async doConversationList({ state, commit }) {
    try {
      const res = await api.get("/chat/conversation");
      console.log(res.data);
      // 将messages 都添加isMe
      const data = res.data.map((co: IConversation) => {
        return {
          ...co,
          messages: co.messages.map((m) => ({
            ...m,
            isMe: m.fromId === state.user?.id,
          })),
        };
      });
      commit("doConversationListUpdate", data);
    } catch (err) {
      console.log(err);
    }
  },
  async doCommunityList({ state, commit }) {
    const res = await api.get("/chat/community");
    if (res.data) {
      commit("doCommunityListUpdate", res.data);
    }
  },
  doActiveUser({ state }, user) {
    state.activeUser = user;
  },
};

export default actions;
