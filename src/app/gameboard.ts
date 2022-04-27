import { Component } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

export enum GameBoardCellOptions {
  UNK = '*',
  X = 'X',
  O = 'O',
}
// export namespace GameBoardCellOptions {
//   export function values(lastSel: GameBoardCellOptions) {
//     console.log(GameBoardCellOptions)
//     return Object.keys(GameBoardCellOptions).filter(
//       (type) => isNaN(<any>type) && type !== 'values'
//       // && type!=='UNK'
//     );
//   }
// }

export namespace GameBoardCellOptions {
  export function getValues(lastSel: GameBoardCellOptions): any {
    return Object.values(GameBoardCellOptions).filter((option) => typeof(option) == 'string');
    ;
  }
}

export class GameBoard {
  id: number;
  cell: Array<GameBoardCellOptions>;
  winIndices: Array<[number, number, number]>;

  constructor(
    id: number,
    cell: Array<GameBoardCellOptions>,
    winIndices: Array<[number, number, number]>
  ) {
    this.id = id;
    this.cell = cell;
    this.winIndices = winIndices;
  }
}


export class PlayedTurn {
  option: GameBoardCellOptions;
  cellIndex: [number, number];

  constructor(option:GameBoardCellOptions, cellIndex:[number, number]){
    this.option=option;
    this.cellIndex=cellIndex

  }
}