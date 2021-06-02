import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

type BodyType = 'text' | 'img' | 'video' | 'audio' | 'location';

interface IBodyType {
  type: BodyType;
}

interface IMedia {
  url: string; // 文件地址
  ext: string; // 文件后缀
  w: number; // 宽度
  h: number; // 高度
  size: number; // 文件大小
}

interface IText extends IBodyType {
  type: 'text';
  content: string;
}

interface IImg extends IBodyType, IMedia {
  type: 'img';
}

interface IVideo extends IBodyType, IMedia {
  type: 'video';
}

interface IAudio extends IBodyType, IMedia {
  type: 'audio';
}

// interface ILocation extends IBodyType {
//   type: 'location';
//   title: string; //地理位置title
//   lng: number; // 经度
//   lat: number; // 纬度
// }

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromId: string;

  @Column()
  toId: string;

  @ManyToOne((type) => User)
  @JoinColumn()
  sender: User;

  @Column({ type: 'json' })
  body: IText | IVideo | IAudio | IImg;

  @ManyToOne((type) => Conversation, (conversation) => conversation.messages)
  conversationId: Conversation;

  @CreateDateColumn()
  createAt: Date;

  from: User;

  to: User;
}
