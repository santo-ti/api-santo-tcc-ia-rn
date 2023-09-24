import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { PlayersService } from '../services/players.service';

@WebSocketGateway()
export class PlayersGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(PlayersGateway.name);

  constructor(private readonly playersService: PlayersService) {}

  @WebSocketServer() public server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected id: ${client.id}`);
    this.logger.log(`Client Connected: ${JSON.stringify(client)}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected id: ${client.id}`);
    this.logger.log(`Client Disconnected: $${JSON.stringify(client)}`);
  }

  @SubscribeMessage('create_player')
  async create(@MessageBody() createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(
      `create_player_request: ${JSON.stringify(createPlayerDto)}`,
    );

    try {
      const playerCreated = await this.playersService.create(createPlayerDto);
      this.logger.log(`player_created: ${JSON.stringify(playerCreated)}`);
      this.server.emit('player_created', playerCreated);
    } catch (error) {
      this.logger.log(`create_player_error: ${JSON.stringify(error)}`);
      this.server.emit('create_player_error', error, createPlayerDto);
    }
  }

  @SubscribeMessage('find_all_players')
  async findAll(): Promise<void> {
    this.logger.log(`find_all_players`);
    const allPlayers = await this.playersService.findAll();

    try {
      this.logger.log(`all_players_found: `, allPlayers);
      this.server.emit('all_players_found', allPlayers);
    } catch (error) {
      this.logger.log(`find_all_players_error: ${JSON.stringify(error)}`);
      this.server.emit('find_all_players_error', error);
    }
  }

  @SubscribeMessage('find_one_player')
  async findOne(@MessageBody() id: string): Promise<void> {
    this.logger.log(`find_one_player: ${id}`);

    try {
      const playerFound = await this.playersService.findOne(id);
      this.logger.log(`one_player_found: `, playerFound);
      this.server.emit('one_player_found', playerFound);
    } catch (error) {
      this.logger.log(`find_one_player_error: ${JSON.stringify(error)}`);
      this.server.emit('find_one_player_error', error, id);
    }
  }

  @SubscribeMessage('update_player')
  async update(@MessageBody() updatePlayerDto: UpdatePlayerDto): Promise<void> {
    this.logger.log(`update_player: ${updatePlayerDto}`);

    try {
      const playerUpdated = await this.playersService.update(
        updatePlayerDto.id,
        updatePlayerDto,
      );
      this.logger.log(`player_updated: `, playerUpdated);
      this.server.emit('player_updated', playerUpdated);
    } catch (error) {
      this.logger.log(`update_player_error: ${JSON.stringify(error)}`);
      this.server.emit('update_player_error', error, updatePlayerDto.id);
    }
  }

  @SubscribeMessage('remove_player')
  async remove(@MessageBody() id: string): Promise<void> {
    this.logger.log(`remove_player: ${id}`);

    try {
      const isPlayerRemoved = await this.playersService.remove(id);
      this.logger.log(`player_removed: `, isPlayerRemoved);
      this.server.emit('player_removed', isPlayerRemoved);
    } catch (error) {
      this.logger.log(`remove_player_error: ${JSON.stringify(error)}`);
      this.server.emit('remove_player_error', error, id);
    }
  }
}
