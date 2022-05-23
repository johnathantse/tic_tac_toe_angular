import { GameCellState, GameBoardCellOptions } from './models/GameCellState';

export class GameBoard {
  private _cells: Array<GameCellState>;
  winIndices: Array<[number, number, number]>;

  constructor(
    winIndices: Array<[number, number, number]>,
    cells: Array<GameCellState>
  ) {
    this.winIndices = winIndices;
    this._cells = cells;
  }

  public get cells() {
    return this._cells;
  }

  public set cells(value) {
    this._cells = value;
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
