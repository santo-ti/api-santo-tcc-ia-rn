import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { name, playerIndex, kalahIndex } = createPlayerDto;
    this.players.push(new Player(name, playerIndex, kalahIndex));
    return this.players.at(-1);
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async findOne(id: string): Promise<Player> {
    return this.players.find((value) => value.id === id);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const { name, playerIndex, kalahIndex } = updatePlayerDto;
    const index = this.players.findIndex((value) => value.id === id);
    this.players[index] = new Player(name, playerIndex, kalahIndex, id);
    return this.players[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.players.findIndex((value) => value.id === id);
    return delete this.players[index];
  }
}
