import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { CustomStrategy } from '@nestjs/microservices';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api/chat');
  app.enableCors();

  // app.use(
  //   cookieSession({
  //     signed: false,
  //     secure: true,
  //   }),
  // );

  const options: CustomStrategy = {
    strategy: new Listener(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      'chat-service',
      {
        url: process.env.NATS_URL,
      },
      {
        durableName: 'chat-service',
        manualAckMode: true,
        deliverAllAvailable: true,
        ackWait: 5 * 1000,
      } /* TransportSubscriptionOptions */,
    ),
  };

  const microService = app.connectMicroservice(options);

  microService.listen(async () => {
    console.log('connect NATS ');
    await app.listen(3000);
  });

  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/api/chat/test',
  });
}
bootstrap();
