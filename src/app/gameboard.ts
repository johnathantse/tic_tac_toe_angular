import { Component } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

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

export class GameBoard {
  id: number;
  private cells: Array<Array<GameCellState>>;
  winIndices: Array<[number, number, number]>;

  constructor(id: number, winIndices: Array<[number, number, number]>) {
    console.log("calling constructor")
    this.id = id;
    this.winIndices = winIndices;
    this.cells = [];
    const size = [0, 1, 2];
    for (const [index, elem] of size.entries()) {
      let row = [];
      for (const [index2, elem2] of size.entries()) {
        let cell: GameCellState = {
          option: GameBoardCellOptions.UNK,
          cellIndex: [index, index2],
        };
        row.push(cell);
      }
    this.cells.push(row);
    }
  }

  public getCells(){
    return this.cells
  }
  
  public setCellOption(option: GameBoardCellOptions, rowIndex:number, colIndex:number){
    this.cells[rowIndex][colIndex].option = option
  }
}

export class GameCellState {
  option: GameBoardCellOptions;
  cellIndex: [number, number];

  constructor(option: GameBoardCellOptions, cellIndex: [number, number]) {
    this.option = option;
    this.cellIndex = cellIndex;
  }
}
