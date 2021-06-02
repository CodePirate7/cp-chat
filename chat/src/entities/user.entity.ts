import { Group } from '../group/group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

// todo: body的类型要定义好

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @ManyToMany((type) => Group, (group) => group.users, { nullable: true })
  groups: Group[];
}
