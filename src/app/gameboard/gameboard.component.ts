import { Component, OnInit } from '@angular/core';
import { GameBoardCellOptions } from '../GameCellState';
import { GameCellState } from '../GameCellState';
import { GameBoard } from '../gameboard';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  lastPlayed: GameCellState;

  turns: Array<GameCellState>;
  hasPlayed: boolean;
  winner?: GameBoardCellOptions | null;
  tieGame: boolean;
  gameboard: GameBoard;
  turnsPlayed: number;

  constructor() {}

  undo() {
    if (this.turns.length > 0) {
      let turn: GameCellState = this.turns.pop()!;
      console.log(turn);
      this.gameboard.setCellOption(GameBoardCellOptions.UNK, turn.id, false);
      this.lastPlayed = this.turns[this.turns.length - 1];
      this.hasPlayed = false;
      this.turnsPlayed--;
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
    this.turnsPlayed++;
    this.gameboard.setCellOption(gameCellState.option, gameCellState.id, true);
    console.log(gameCellState);
    this.calculateWin();
    this.checkCats();
  }

  public calculateWin() {
    let cells = this.gameboard.cells;
    for (let winCond of this.gameboard.winIndices) {
      if (
        cells[winCond[0]].option == cells[winCond[1]].option &&
        cells[winCond[1]].option == cells[winCond[2]].option &&
        cells[winCond[0]].option != GameBoardCellOptions.UNK
      ) {
        this.winner = cells[winCond[0]].option;
        console.log(`Player ${this.winner} wins`);
      }
    }
  }

  public checkCats() {
    if (this.turnsPlayed >= 9) {
      console.log('Cats game');
      this.tieGame = false;
    }
  }

  initializeGameBoard() {
    this.lastPlayed = new GameCellState(GameBoardCellOptions.UNK, false, -1);
    this.turns = [];
    this.turns.push(this.lastPlayed);
    this.hasPlayed = false;
    this.winner = null;
    this.turnsPlayed = 0;
    let cells = [];
    for (let i = 0; i < 9; i++) {
      let cell = new GameCellState(GameBoardCellOptions.UNK, false, i);
      cells.push(cell);
    }
    this.gameboard = new GameBoard(
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
      ],
      cells
    );
  }

  ngOnInit(): void {
    this.initializeGameBoard();
    console.log(this.gameboard);
  }
}
