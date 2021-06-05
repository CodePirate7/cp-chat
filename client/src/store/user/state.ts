import { IApp, ICommunityItem, IUser } from "./../../interface";
import { IConversation } from "src/interface";

export interface UserStateInterface {
  user: IUser | null;
  conversationList: IConversation[];
  activeUser: IUser | null;
  communityList: ICommunityItem[];
  activeApp: IApp | null;
}

function state(): UserStateInterface {
  return {
    user: null,
    conversationList: [],
    activeUser: null,
    communityList: [],
    activeApp: null,
  };
}

export default state;
