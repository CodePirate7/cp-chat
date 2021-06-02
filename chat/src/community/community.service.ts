import { Community } from './community.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/entities/user.entity';

export interface ICreateDto {
  content: string;
  fromId: string;
}

export interface IAppendDto {
  fromId: string;
  communityId: number;
  content: string;
}

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllCommunity() {
    // return this.commentRepository.find({
    //   relations: ['community'],
    // });
    const all = await this.communityRepository.find({
      order: {
        createAt: 'DESC',
      },
      relations: ['comments', 'user', 'comments.user'],
    });

    return all.map((a) => {
      const comments = a.comments;
      comments.sort((a, b) => a.id - b.id);
      return { ...a, comments };
    });
  }

  async createCommunity(createDto: ICreateDto, userId: string) {
    const { content } = createDto;

    const user = await this.userRepository.findOne({ id: userId });

    const community = new Community();
    community.content = content;
    community.user = user;

    return this.communityRepository.save(community);
  }

  async appendComment(appendDto: IAppendDto, userId: string) {
    const { content, communityId } = appendDto;

    const community = await this.communityRepository.findOne(
      { id: communityId },
      {
        relations: ['comments'],
      },
    );

    if (community) {
      const comment = new Comment();
      const user = await this.userRepository.findOne({ id: userId });
      comment.user = user;
      comment.content = content;
      community.comments.push(comment);
      console.log(community);
      await this.communityRepository.save(community);

      return community;
    }

    return false;
  }
}
