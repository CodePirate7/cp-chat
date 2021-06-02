import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';

export type ConversationType = 'single' | 'group';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['single', 'group'],
    default: 'single',
  })
  type: ConversationType;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  activeTime: Date;

  @OneToMany((type) => Message, (message) => message.conversationId)
  messages: Message[];
}
