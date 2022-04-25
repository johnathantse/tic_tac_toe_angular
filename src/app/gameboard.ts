import { Component } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

export enum GameBoardCellOptions {
  UNK = '*',
  X = 'X',
  O = 'O',
}
export namespace GameBoardCellOptions {
  export function values(lastSel: GameBoardCellOptions) {
    return Object.keys(GameBoardCellOptions).filter(
      (type) => isNaN(<any>type) && type !== 'values'
      // && type!=='UNK'
    );
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
