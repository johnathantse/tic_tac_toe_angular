import { Component, OnInit } from '@angular/core';
import { GameBoardCellOptions } from '../GameCellState';
import { GameCellState } from '../GameCellState';
import { GameBoard } from '../gameboard';
import { GameboardService } from '../gameboard.service';
import { GameBoardState } from '../models/GameBoardState';
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  // lastPlayed: GameCellState;
  // turns: Array<GameCellState>;
  // hasPlayed: boolean;
  // winner?: GameBoardCellOptions | null;
  // tieGame: boolean;
  // gameboard: GameBoard;
  // turnsPlayed: number;

  gameBoardState: GameBoardState;

  constructor(private _gameboardService: GameboardService) {}

  undo() {
    if (this.gameBoardState.turns.length > 1) {
      let turn: GameCellState = this.gameBoardState.turns.pop()!;
      console.log(turn);
      this.gameBoardState.gameboard.setCellOption(
        GameBoardCellOptions.UNK,
        turn.id,
        false
      );
      this.gameBoardState.lastPlayed =
        this.gameBoardState.turns[this.gameBoardState.turns.length - 1];
      this.gameBoardState.turnsPlayed--;
      if (this.gameBoardState.turns.length <= 1) {
        this.gameBoardState.hasPlayed = false;
      }
    }
  }

  public updateGameState(gameCellState: GameCellState) {
    this.gameBoardState.hasPlayed = true;
    this.gameBoardState.lastPlayed = gameCellState;
    this.gameBoardState.turns.push(gameCellState);
    this.gameBoardState.turnsPlayed++;
    this.gameBoardState.gameboard.setCellOption(
      gameCellState.option,
      gameCellState.id,
      true
    );
    console.log(JSON.stringify(this.gameBoardState));
    if (!this.calculateWin()) {
      this.checkCats();
    }
  }

  public calculateWin() {
    let cells = this.gameBoardState.gameboard.cells;
    for (let winCond of this.gameBoardState.gameboard.winIndices) {
      if (
        cells[winCond[0]].option == cells[winCond[1]].option &&
        cells[winCond[1]].option == cells[winCond[2]].option &&
        cells[winCond[0]].option != GameBoardCellOptions.UNK
      ) {
        this.gameBoardState.winner = cells[winCond[0]].option;
        return true;
      }
    }
    return false;
  }

  public checkCats() {
    if (this.gameBoardState.turnsPlayed >= 9) {
      console.log('Cats game');
      this.gameBoardState.tieGame = true;
    }
  }

  initializeGameBoard() {
    this.gameBoardState = new GameBoardState();
    this.gameBoardState.lastPlayed = new GameCellState(
      GameBoardCellOptions.UNK,
      false,
      -1
    );
    this.gameBoardState.turns = [];
    this.gameBoardState.turns.push(this.gameBoardState.lastPlayed);
    this.gameBoardState.hasPlayed = false;
    this.gameBoardState.winner = null;
    this.gameBoardState.turnsPlayed = 0;
    this.gameBoardState.tieGame = false;
    let cells = [];
    for (let i = 0; i < 9; i++) {
      let cell = new GameCellState(GameBoardCellOptions.UNK, false, i);
      cells.push(cell);
    }
    this.gameBoardState.gameboard = new GameBoard(
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

  saveGame() {
    this._gameboardService
      .saveGame(this.gameBoardState)
      .subscribe((data) => console.log(data)),
      (error: any) => console.log(error);
  }

  loadGame() {
    this._gameboardService
      .loadGame()
      .subscribe((loadState) => this.updateFromLoad(loadState));
  }

  updateFromLoad(loadState: GameBoardState) {
    this.gameBoardState.lastPlayed = loadState.lastPlayed;
    this.gameBoardState.turns = loadState.turns;
    this.gameBoardState.gameboard.cells = loadState.cells;
  }

  ngOnInit(): void {
    this.initializeGameBoard();
    console.log(this.gameBoardState.gameboard);
    this._gameboardService.loadGame().subscribe((data) => console.log(data));
  }
}
