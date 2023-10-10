import { IsNotEmpty, IsString } from 'class-validator';
import { PlayerIndexEnum } from '../../enums/player-index.enum';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly playerIndex: PlayerIndexEnum;
}
