import { Comment } from './comment.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  content: string;

  @OneToMany((type) => Comment, (c) => c.community, { cascade: true })
  comments: Comment[];

  @CreateDateColumn()
  createAt: Date;
}
