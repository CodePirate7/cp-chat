import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation, User])],

  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
