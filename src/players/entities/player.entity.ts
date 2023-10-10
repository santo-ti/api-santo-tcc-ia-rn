import { v4 as uuidv4 } from 'uuid';
import { KalahIndexEnum } from '../enums/kalah-index.enum';
import { PlayerIndexEnum } from '../enums/player-index.enum';

export class Player {
  readonly id: string;
  readonly name: string;
  readonly playerIndex: PlayerIndexEnum;
  readonly kalahIndex: KalahIndexEnum;

  constructor(
    name: string,
    playerIndex: PlayerIndexEnum,
    id: string = uuidv4(),
  ) {
    this.id = id;
    this.name = name;
    this.playerIndex = playerIndex;
    this.kalahIndex = this.getKalahIndex();
    Object.freeze(this);
  }

  private getKalahIndex(): KalahIndexEnum {
    if (this.playerIndex === PlayerIndexEnum.FIRST) return KalahIndexEnum.FIRST;
    return KalahIndexEnum.LAST;
  }
}
