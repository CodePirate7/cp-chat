import { Conversation } from 'src/entities/conversation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 群名称

  @Column({ default: '' })
  avatar: string; // 群头像

  @Column()
  introduction: string; // 群简介

  @Column()
  ownerId: string; // 群主id

  @Column({ default: false })
  disabled: boolean; // 是否解散

  @OneToOne((type) => Conversation)
  @JoinColumn()
  conversation: Conversation;

  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable()
  users: User[];
}
