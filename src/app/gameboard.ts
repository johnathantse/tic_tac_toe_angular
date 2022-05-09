import { GameCellState, GameBoardCellOptions } from './GameCellState';

export class GameBoard {
  private _cells: Array<GameCellState>;
  winIndices: Array<[number, number, number]>;

  constructor(winIndices: Array<[number, number, number]>, cells: Array<GameCellState>) {
    this.winIndices = winIndices;
    this._cells = cells;
  }

  public get cells() {
    return this._cells;
  }

  public setCellOption(
    option: GameBoardCellOptions,
    index: number,
    playStatus: boolean
  ) {
    this._cells[index].option = option;
    this._cells[index].cellHasPlayed = playStatus;
  }
}
