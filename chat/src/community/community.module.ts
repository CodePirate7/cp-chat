import { Comment } from './comment.entity';
import { Community } from './community.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Community, Comment, User])],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
