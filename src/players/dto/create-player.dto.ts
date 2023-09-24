import { IsNotEmpty, IsString } from 'class-validator';
import { KalahIndexEnum } from '../enums/kalah-index.enum';
import { PlayerIndexEnum } from '../enums/player-index.enum';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly playerIndex: PlayerIndexEnum;

  @IsNotEmpty()
  readonly kalahIndex: KalahIndexEnum;
}
