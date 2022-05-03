import { GameCellState, GameBoardCellOptions } from "./GameCellState";

export class GameBoard {
  private _cells: Array<Array<GameCellState>>;

  constructor() {
    console.log("setting up gameboard")
    this._cells = [];
    const size = [0, 1, 2];
    for (const index of size) {
      let row = [];
      for (const index2 of size) {
        let cell = new GameCellState(
          GameBoardCellOptions.UNK,
          [index, index2],
          false
        );
        row.push(cell);
      }
    this._cells.push(row);
    }
  }

  public get cells(){
    return this._cells
  }
  
  public setCellOption(option: GameBoardCellOptions, rowIndex:number, colIndex:number, playStatus: boolean){
    this._cells[rowIndex][colIndex].option = option
    this._cells[rowIndex][colIndex].cellHasPlayed = playStatus
  }
}