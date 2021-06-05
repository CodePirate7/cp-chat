import { MutationTree } from "vuex";
import { UserStateInterface } from "./state";

const mutation: MutationTree<UserStateInterface> = {
  doConversationListUpdate(state, payload) {
    state.conversationList = payload;
  },
  doMessageUpdate(state, payload) {
    state.conversationList[payload.idx].messages.push(payload.message);
    state.conversationList[payload.idx].activeTime = payload.message.createAt;
  },
  doCommunityListUpdate(state, payload) {
    state.communityList = payload;
  },
  doActiveApp(state, payload) {
    state.activeApp = payload;
  },
};

export default mutation;
