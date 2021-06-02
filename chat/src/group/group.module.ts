import { Group } from './group.entity';
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Conversation, User])],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
