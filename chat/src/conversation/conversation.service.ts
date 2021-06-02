import { Connection, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/entities/friend.entity';
import { Conversation } from '../entities/conversation.entity';
import { CreateDto } from './dto/create.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  // 获取用户的所有对话
  async getAll(userId: string) {
    // 查找单聊关系的conversation
    const friends = await this.friendRepository.find({
      where: { userId },
      relations: [
        'conversation',
        'conversation.messages',
        'conversation.messages.sender',
      ],
    });

    // 填充target
    for (const friend of friends) {
      const target = await this.userRepository.findOne({ id: friend.friendId });
      friend.target = target;
    }

    const friendsConversations = friends.map((f) => ({
      ...f.conversation,
      target: f.target,
    }));

    // 查找群聊关系的conversation

    const user = await this.userRepository.findOne(userId, {
      relations: [
        'groups',
        'groups.conversation',
        'groups.conversation.messages',
        'groups.conversation.messages.sender',
      ],
    });

    const groupConversations = user.groups.map((g) => ({
      ...g.conversation,
      target: { nickname: g.name, avatar: g.avatar, id: g.id },
    }));

    // 排序
    return [...friendsConversations, ...groupConversations];
  }

  /**
   * 创建会话
   * @param createDto
   */
  async createConversation(createDto: CreateDto) {
    return this.createSingle(createDto);
  }

  async createSingle(dto: { toId: string; userId?: string }) {
    const { toId, userId } = dto;
    const friend = await this.friendRepository.findOne(
      {
        userId,
        friendId: toId,
      },
      {
        relations: ['conversation'],
      },
    );
    if (friend) {
      return friend.conversation;
    }
    const co = new Conversation();
    co.type = 'single';
    await this.conversationRepository.save(co);
    await Promise.all([
      this.friendRepository.save(this.createFriend(toId, userId, co)),
      this.friendRepository.save(this.createFriend(userId, toId, co)),
    ]);

    return co;
  }

  // 创建朋友关系
  createFriend(userId: string, friendId: string, co: Conversation) {
    const friend = new Friend();
    friend.conversation = co;
    friend.userId = userId;
    friend.friendId = friendId;
    return friend;
  }

  // 和其他所有用户创建朋友关系
  async createFriendAll(userId: string) {
    // 获取所有用户
    const allUsers = await this.userRepository.find();

    for (const user of allUsers) {
      if (user.id !== userId) {
        await this.createFriendAndCo(userId, user.id);
      }
    }
  }

  async createFriendAndCo(userId, toId) {
    const co = new Conversation();
    co.type = 'single';
    co.activeTime = new Date();
    await this.conversationRepository.save(co);
    await Promise.all([
      this.friendRepository.save(this.createFriend(userId, toId, co)),
      this.friendRepository.save(this.createFriend(toId, userId, co)),
    ]);
    return co;
  }
}
