import { Injectable } from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from '../dto/input';
import { PlayerOutputDto } from '../dto/output/player.output.dto';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerOutputDto> {
    const { name, playerIndex } = createPlayerDto;
    const newPlayer = new Player(name, playerIndex);
    this.players.push(newPlayer);
    return this.players.at(-1);
  }

  async findAll(): Promise<PlayerOutputDto[]> {
    return this.players;
  }

  async findOne(id: string): Promise<PlayerOutputDto> {
    return this.players.find((player) => player.id === id);
  }

  async update(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<PlayerOutputDto> {
    const { name, playerIndex } = updatePlayerDto;
    const index = this.players.findIndex((player) => player.id === id);
    this.players[index] = new Player(name, playerIndex, id);
    return this.players[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.players.findIndex((player) => player.id === id);
    console.log('index', index);
    console.log('delete this.players[index]', delete this.players[index]);

    return delete this.players[index];
  }
}
