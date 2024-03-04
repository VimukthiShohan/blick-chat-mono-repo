import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../../utils/socketEvents';
import { SocketMessageDto } from './dto/conversation.dto';

@WebSocketGateway()
export class ConversationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ConversationGateway.name);

  @WebSocketServer()
  server: Server;

  users: Socket[] = [];

  handleConnection(socket: Socket) {
    this.users.push(socket);
    this.logger.debug('A user connected>>>', socket);
  }

  handleDisconnect(socket: Socket) {
    this.users = this.users.filter((user) => user.id !== socket.id);
    this.logger.debug('A user disconnected>>>');
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_ROOM)
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.logger.debug(`User joined room: ${room}`);
  }

  @SubscribeMessage(SOCKET_EVENTS.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    this.logger.debug(`User left room: ${room}`);
  }

  @SubscribeMessage(SOCKET_EVENTS.CONVERSATION_MESSAGE)
  handleMessage(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    payload: SocketMessageDto,
  ) {
    this.logger.debug(`Received message from ${client.id}: ${payload.msg}`);
    this.server
      .to(payload.conversationId)
      .emit(SOCKET_EVENTS.CONVERSATION_MESSAGE, payload);
  }
}
