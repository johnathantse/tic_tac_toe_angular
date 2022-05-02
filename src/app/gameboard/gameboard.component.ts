import { Component, OnInit } from '@angular/core';
import { GameBoard, GameBoardCellOptions, GameCellState } from '../gameboard';
import { GamecellOptionsComponent } from '../gamecell-options/gamecell-options.component';
import { WinsTracker } from '../wins-tracker';
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  lastPlayed: GameCellState = {
    option: GameBoardCellOptions.UNK,
    cellIndex: [-1, -1],
    cellHasPlayed: false
  };
  turns: Array<GameCellState>;
  gameboard = new GameBoard(
    1,
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
      
     );

  hasPlayed=false;
  playerSelect = GameBoardCellOptions.UNK
  winsTrackerX = new WinsTracker();
  winsTrackerO = new WinsTracker();

  constructor() {}

  undo() {
    if(this.turns.length > 0){
      let turn: GameCellState = this.turns.pop()!;
      console.log(turn)
      this.gameboard.setCellOption(
        GameBoardCellOptions.UNK, 
        turn.cellIndex[0], 
        turn.cellIndex[1],
        false
      )
      if(turn.option == GameBoardCellOptions.X){
        this.winsTrackerX.undoTurn(turn.cellIndex[0], turn.cellIndex[1])
      }
      else {
        this.winsTrackerO.undoTurn(turn.cellIndex[0], turn.cellIndex[1])
      }
      this.lastPlayed = this.turns[this.turns.length - 1];
      this.hasPlayed = false;
    }
  }

  public getLastTurnOption() {
    console.log('retrieving last turn option');
    return this.turns[this.turns.length - 1].option;
  }

  public updateGameState(gameCellState: GameCellState){
    console.log('updating game state')
    this.hasPlayed=true;
    this.lastPlayed = gameCellState
    this.turns.push(gameCellState)
    this.gameboard.setCellOption(gameCellState.option, gameCellState.cellIndex[0], gameCellState.cellIndex[1], true)
    console.log(this.gameboard)
    if(gameCellState.option == GameBoardCellOptions.X){
      this.winsTrackerX.addTurn(gameCellState.cellIndex[0], gameCellState.cellIndex[1]);
      if(this.winsTrackerX.calculateWin(gameCellState.cellIndex[0], gameCellState.cellIndex[1])){
        console.log("Player X win")
      }
    }
    else{
      this.winsTrackerO.addTurn(gameCellState.cellIndex[0], gameCellState.cellIndex[1])
      if(this.winsTrackerO.calculateWin(gameCellState.cellIndex[0], gameCellState.cellIndex[1])){
        console.log("Player O win")
      }
    }

  }

  ngOnInit(): void {
    console.log(this.gameboard)
    console.log(this.gameboard.getCells()[0][0])
    this.turns = [];
    this.turns.push(this.lastPlayed);
  }
}
