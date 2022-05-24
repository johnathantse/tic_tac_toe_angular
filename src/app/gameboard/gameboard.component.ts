import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameBoardCellOptions } from '../models/GameCellState';
import { GameCellState } from '../models/GameCellState';
import { GameboardService } from '../gameboard.service';
import { GameBoardState } from '../models/GameBoardState';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

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
  alert: boolean = false;
  alertType: string = "";
  message: string = "";

  constructor(private _gameboardService: GameboardService) {}

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
    this.gameBoardState.winner = null;
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
      .subscribe((loadState) => this.updateFromLoad(loadState)),
      (error: any) => console.log(error);
  }

  confirmLoad() {
    // If there is a game in progress, have user confirm before loading.
    if (this.gameBoardState.hasPlayed) {
      this.confirmation.open();
    } else {
      this.loadGame();
    }
  }

  closeLoadModal() {
    if (this.confirmation.confirmResult) {
      this.loadGame();
    }
  }

  updateFromLoad(loadState: GameBoardState) {
    this.gameBoardState = loadState;
  }

  // saveGame() {
  //   this._gameboardService
  //     .saveGame(this.gameBoardState)
  //     .subscribe((data) => this.onSucess(data)),
  //     (error: any) => console.error('Error saving game: ' + error),
  //     (data: any) => console.log('Results:' + data);
  // }

  saveGame() {
    this._gameboardService.saveGame(this.gameBoardState).subscribe({
      next: () => this.onSuccess("Game saved successfully"),
      error: (error: any) => this.onError("Error saving game" + error),
    });
    if (this.alert == false) {
      setTimeout(() => this.closeAlert(), 5000);
    }
  }

  onSuccess(message: string) {
    this.alertType = "success";
    this.alert = true;
    this.message = message
  }

  onError(message: any){
    this.alertType="danger";
    this.alert = true;
    this.message = message
  }

  closeAlert() {
    this.alert = false;
    this.alertType = "";
    this.message = "";
  }

  ngOnInit(): void {
    this.initializeGameBoard();
  }
}
