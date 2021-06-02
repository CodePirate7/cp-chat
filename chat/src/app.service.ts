import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCreatedEvent } from './events/user-created-event';
import { Repository } from 'typeorm';
import { ConversationService } from './conversation/conversation.service';

// 1. friends 获取所有的

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private conversationService: ConversationService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(userDto: UserCreatedEvent['data']) {
    const user = new User();
    user.id = userDto.id;
    user.email = userDto.email;
    user.avatar = userDto.avatar;
    user.nickname = userDto.nickName;
    await this.usersRepository.save(user);
    await this.conversationService.createFriendAll(user.id);
  }
}
