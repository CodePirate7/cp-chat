import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { Friend } from 'src/entities/friend.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message, Friend, User])],
  providers: [ConversationService],
  controllers: [ConversationController],
  exports: [ConversationService],
})
export class ConversationModule {}
