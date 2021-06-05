export interface IUser {
  id: string;
  email: string;
  nickName: string;
  avatar: string;
}

export interface IApp {
  label: string;
  url: string;
  icon: string;
}

export interface IMessage {
  id: number;

  fromId: string;

  toId: string;

  sender: IUser;

  body: any;

  conversationId: number;

  isMe: boolean;

  createAt: string;
}

export interface IConversation {
  id: number;
  type: "single" | "group";
  isActive: boolean;
  activeTime: string;
  target: IUser;
  messages: IMessage[];
}

export interface ICommunityItem {
  id: number;
  content: string;
  comments: {
    id: number;
    content: string;
    user: IUser;
  }[];
  createAt: string;
  user: IUser;
  value: string; // 本地评论
}
