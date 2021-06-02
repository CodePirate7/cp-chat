import { Conversation } from './conversation.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  friendId: string;

  @ManyToOne((type) => Conversation)
  @JoinColumn()
  conversation: Conversation;

  target: User;
}
