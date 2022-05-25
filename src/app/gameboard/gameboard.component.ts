import { Component, OnInit, ViewChild } from '@angular/core';
import { GameBoardCellOptions } from '../models/GameCellState';
import { GameCellState } from '../models/GameCellState';
import { GameboardService } from '../gameboard.service';
import { GameBoardState } from '../models/GameBoardState';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  @ViewChild('confirmation') confirmation: ConfirmModalComponent;

  gameBoardState: GameBoardState;
  winIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  constructor(
    private _gameboardService: GameboardService,
    private _modalService: NgbModal
  ) {}

  public setCellOption(
    cell: GameCellState,
    option: GameBoardCellOptions,
    playStatus: boolean
  ) {
    cell.option = option;
    cell.cellHasPlayed = playStatus;
  }

  public undo() {
    if (this.gameBoardState.turns.length > 1) {
      let turn: GameCellState = this.gameBoardState.turns.pop()!;
      console.log(turn);
      let cell = this.gameBoardState.cells[turn.id];
      this.setCellOption(cell, GameBoardCellOptions.UNK, false);
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
    let cell = this.gameBoardState.cells[gameCellState.id];
    this.setCellOption(cell, gameCellState.option, true);
    console.log(JSON.stringify(this.gameBoardState));
    if (!this.calculateWin()) {
      this.checkCats();
    }
  }

  public calculateWin() {
    let cells = this.gameBoardState.cells;
    for (let winCond of this.winIndices) {
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
    this.gameBoardState.winner = '';
    this.gameBoardState.turnsPlayed = 0;
    this.gameBoardState.tieGame = false;
    let cells = [];
    for (let i = 0; i < 9; i++) {
      let cell = new GameCellState(GameBoardCellOptions.UNK, false, i);
      cells.push(cell);
    }
    this.gameBoardState.cells = cells;
  }

  loadGame() {
    this._gameboardService
      .loadGame()
      .subscribe((loadState) => this.gameBoardState = loadState),

      (error: any) => console.log(error);
      console.log(this.gameBoardState);
  }

  confirmLoad() {
    // If there is a game in progress, have user confirm before loading.
    if (this.gameBoardState.hasPlayed) {
      this._modalService
        .open(ConfirmModalComponent, {
          backdrop: 'static',
          keyboard: false,
          centered: true,
        })
        .result.then(
          () => {
            this.loadGame();
          },
          (reject) => {
            console.log(reject)
          }
        );
    } else {
      this.loadGame();
    }
  }

  saveGame() {
    this._gameboardService
      .saveGame(this.gameBoardState)
      .subscribe((data) => console.log(data)),
      (error: any) => console.log(error);
  }

  ngOnInit(): void {
    this.initializeGameBoard();
  }
}
