import { ICommunityItem, IUser } from "./../../interface";
import { IConversation } from "src/interface";

export interface UserStateInterface {
  user: IUser | null;
  conversationList: IConversation[];
  activeUser: IUser | null;
  communityList: ICommunityItem[];
}

function state(): UserStateInterface {
  return {
    user: null,
    conversationList: [],
    activeUser: null,
    communityList: [],
  };
}

export default state;
