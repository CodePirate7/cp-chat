import { Community } from './community.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/entities/user.entity';

export type ConversationType = 'single' | 'group';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  content: string;

  @ManyToOne((type) => Community, (c) => c.comments)
  community: Community;

  @CreateDateColumn()
  createAt: Date;
}
