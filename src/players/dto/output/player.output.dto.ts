import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { KalahIndexEnum } from '../../enums/kalah-index.enum';
import { UpdatePlayerDto } from '../input/update-player.dto';

export class PlayerOutputDto extends PartialType(UpdatePlayerDto) {
  @IsNotEmpty()
  readonly kalahIndex: KalahIndexEnum;
}
