import { GameCellState, GameBoardCellOptions } from './GameCellState';

export class GameBoard {
  private _cells: Array<GameCellState>;
  winIndices: Array<[number, number, number]>;

  constructor(winIndices: Array<[number, number, number]>) {
    console.log('setting up gameboard');
    this.winIndices = winIndices;
    this._cells = [];

    for (let i = 0; i < 9; i++) {
      let cell = new GameCellState(GameBoardCellOptions.UNK, false, i);
      this._cells.push(cell);
    }
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
