import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export interface MessageDto {
  conversationId: number;
  fromId: string;
  toId: string;
  body: any;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveMessage(messageDto: MessageDto) {
    // 查找conversation
    const conversation = await this.conversationRepository.findOne(
      {
        id: messageDto.conversationId,
      },
      {
        relations: ['messages'],
      },
    );

    const sender = await this.userRepository.findOne(messageDto.fromId);

    // 创建消息
    const message = new Message();
    message.fromId = messageDto.fromId;
    message.toId = messageDto.toId;
    message.sender = sender;
    message.body = messageDto.body;
    message.conversationId = conversation;

    await this.messageRepository.save(message);
    conversation.messages.push(message);
    conversation.activeTime = new Date();
    await this.conversationRepository.save(conversation);

    // message.from = await this.userRepository.findOne({ id: message.fromId });
    // message.to = await this.userRepository.findOne({ id: message.toId });
    return message;
  }
}
