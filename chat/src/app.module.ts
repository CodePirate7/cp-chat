import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CookieSessionModule } from 'nestjs-cookie-session';

import { Group } from './group/group.entity';
import { User } from './entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { JwtStrategy } from './jwt.strategy';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { CommunityModule } from './community/community.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URI,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Group]),
    CookieSessionModule.forRoot({
      session: { signed: false, secure: false },
    }),

    JwtModule.register({
      secret: process.env.JWT_KEY,
    }),

    ConversationModule,

    MessageModule,

    CommunityModule,

    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, JwtStrategy],
})
export class AppModule {}
