import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Subjects } from './events/subjects';
import { UserCreatedEvent } from './events/user-created-event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(@Req() req): string {
    console.log(req.user);
    return this.appService.getHello();
  }

  @EventPattern(Subjects.UserCreated)
  public async userCreatedHandler(
    @Payload() data: UserCreatedEvent['data'],
    @Ctx() context: NatsStreamingContext,
  ) {
    console.log(`received message: ${JSON.stringify(data)}`);
    await this.appService.createUser(data);
    context.message.ack();
  }

  // todo： 完成UserUpdated事件
  @EventPattern(Subjects.UserUpdated)
  public async userUpdatedHandler(
    @Payload() data: UserCreatedEvent['data'],
    @Ctx() context: NatsStreamingContext,
  ) {
    console.log(`received message: ${JSON.stringify(data)}`);
    // await this.appService.createUser(data);·
    context.message.ack();
  }
}
