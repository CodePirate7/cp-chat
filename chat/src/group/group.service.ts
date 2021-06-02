import { Group } from './group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Conversation } from 'src/entities/conversation.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  getAllUser(userId: string) {
    return this.userRepository.find({
      where: {
        id: Not(userId),
      },
    });
  }

  async getAll() {
    return this.groupRepository.find({ relations: ['conversation'] });
  }

  async createGroup(createGroupDto: CreateGroupDto, userId: string) {
    /**
     * 创建群聊
     * 1. 查找用户信息 用户本身的信息  和 群成员的信息
     * 2. 创建会话 会话类型为group
     * 3. 创建群
     * 4. 将群信息保存到用户的group数组中
     */
    const createUser = await this.userRepository.findOne(userId, {
      relations: ['groups'],
    });
    const groupMembers = await this.userRepository.findByIds(
      createGroupDto.users,
      {
        relations: ['groups'],
      },
    );

    const conversation = this.conversationRepository.create({
      type: 'group',
      activeTime: new Date(),
    });
    // 保存会话
    await this.conversationRepository.save(conversation);
    // 创建群
    const group = this.groupRepository.create({
      ...createGroupDto,
      users: groupMembers,
      conversation,
      ownerId: userId,
    });

    await this.groupRepository.save(group);

    await Promise.all(
      [createUser, ...groupMembers].map((user) => {
        console.log(user);
        user.groups.push(group);
        return this.userRepository.save(user);
      }),
    );

    return group;
  }
}
