export enum GameBoardCellOptions {
  UNK = '*',
  X = 'X',
  O = 'O',
}

export namespace GameBoardCellOptions {
  export function getValues(): any {
    return Object.values(GameBoardCellOptions).filter(
      (option) => typeof option == 'string'
    );
  }
}

export class GameCellState {
  private _option: GameBoardCellOptions;
  private _cellHasPlayed: boolean;
  private _id: number;

  constructor(
    option: GameBoardCellOptions,
    cellHasPlayed: boolean,
    id: number
  ) {
    this.option = option;
    this.cellHasPlayed = cellHasPlayed;
    this.id = id;
  }

  public get option() {
    return this._option;
  }
  public set option(option: GameBoardCellOptions) {
    this._option = option;
  }

  public get cellHasPlayed(): boolean {
    return this._cellHasPlayed;
  }

  public set cellHasPlayed(value: boolean) {
    this._cellHasPlayed = value;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
}
