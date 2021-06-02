import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket, ServerOptions } from 'socket.io';
import { MessageDto, MessageService } from './message/message.service';

interface IUserMap {
  sockets: string[];
}

@WebSocketGateway<Partial<ServerOptions>>({
  path: '/api/chat/im',
  cookie: {
    secure: false,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() wss: Server;

  userMap = new Map<string, IUserMap>();

  afterInit(server: any) {
    this.logger.log('AppGateway init');
  }

  handleConnection(client: Socket) {
    const { userId } = client.handshake.query;
    this.addUser(userId as string, client.id);
    this.logger.log(`AppGateway connection ${client.id}}`);
  }

  handleDisconnect(client: Socket) {
    const { userId } = client.handshake.query;
    this.removeUser(userId as string, client.id);
  }

  addUser(userId: string, socketId: string) {
    if (this.userMap.has(userId)) {
      this.userMap.get(userId).sockets.push(socketId);
    } else {
      this.userMap.set(userId, {
        sockets: [socketId],
      });
    }
  }

  removeUser(userId: string, socketId: string) {
    if (!this.userMap.has(userId)) {
      return;
    }
    let sockets = this.userMap.get(userId).sockets;
    let socketIndex = this.userMap.get(userId).sockets.indexOf(socketId);
    if (socketIndex !== -1) {
      sockets.splice(socketIndex, 1);
      if (sockets.length === 0) {
        this.userMap.delete(userId);
      }
    }
  }

  @SubscribeMessage('new-message')
  async handleSingleMessage(client: Socket, payload: MessageDto) {
    const newMessage = await this.messageService.saveMessage(payload);
    delete newMessage.conversationId;

    this.wss.to(payload.conversationId + '').emit('new-message', {
      ...newMessage,
      conversationId: payload.conversationId,
    });
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: { conversationId: string }) {
    const { conversationId } = payload;
    await client.join(conversationId);
    console.log('join conversation', conversationId);
  }
}
