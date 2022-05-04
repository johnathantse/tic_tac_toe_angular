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
  private _cellIndex: [number, number];
  private _cellHasPlayed: boolean;
  public id: number;

  constructor(option: GameBoardCellOptions, cellIndex: [number, number], cellHasPlayed: boolean, id:number) {
    this.option = option;
    this.cellIndex = cellIndex;
    this.cellHasPlayed = cellHasPlayed;
    this.id = id;
  }

  public get option() {
    return this._option;
  }
  public set option(option: GameBoardCellOptions) {
    this._option = option;
  }

  public get cellIndex(): [number, number] {
    return this._cellIndex;
  }

  public set cellIndex(value: [number, number]) {
    this._cellIndex = value;
  }

  public get cellHasPlayed(): boolean {
    return this._cellHasPlayed;
  }

  public set cellHasPlayed(value: boolean) {
    this._cellHasPlayed = value;
  }

}
