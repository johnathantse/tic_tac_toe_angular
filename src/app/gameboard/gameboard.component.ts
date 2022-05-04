import { Component, OnInit } from '@angular/core';
import { GameBoard } from '../gameboard';
import { GameCellState } from '../GameCellState';
import { GameBoardCellOptions } from '../GameCellState';
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  lastPlayed = new GameCellState(GameBoardCellOptions.UNK, false, -1);

  turns: Array<GameCellState>;
  gameboard = new GameBoard([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ]);

  hasPlayed = false;
  winner?: GameBoardCellOptions;

  constructor() {}

  undo() {
    if (this.turns.length > 0) {
      let turn: GameCellState = this.turns.pop()!;
      console.log(turn);
      this.gameboard.setCellOption(GameBoardCellOptions.UNK, turn.id, false);
      this.lastPlayed = this.turns[this.turns.length - 1];
      this.hasPlayed = false;
    }
  }

  public getLastTurnOption() {
    console.log('retrieving last turn option');
    return this.turns[this.turns.length - 1].option;
  }

  public updateGameState(gameCellState: GameCellState) {
    console.log('updating game state');
    this.hasPlayed = true;
    this.lastPlayed = gameCellState;
    this.turns.push(gameCellState);
    this.gameboard.setCellOption(gameCellState.option, gameCellState.id, true);
    console.log(gameCellState);
    this.calculateWin();
  }

  public calculateWin() {
    let cells = this.gameboard.cells;
    for (let winCond of this.gameboard.winIndices) {
      if (
        cells[winCond[0]].option == cells[winCond[1]].option &&
        cells[winCond[1]].option == cells[winCond[2]].option &&
        cells[winCond[0]].option != '*'
      ) {
        this.winner = cells[winCond[0]].option;
        console.log(`Player ${this.winner} wins`);
      }
    }
  }

  ngOnInit(): void {
    console.log(this.gameboard);
    this.turns = [];
    this.turns.push(this.lastPlayed);
  }
}
