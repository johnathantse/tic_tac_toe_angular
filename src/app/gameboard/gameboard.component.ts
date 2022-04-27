import { Component, OnInit } from '@angular/core';
import { GameBoard, GameBoardCellOptions, PlayedTurn } from '../gameboard';
import { GamecellOptionsComponent } from '../gamecell-options/gamecell-options.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  readonly size = [...Array(3).keys()];
  // lastPlayed = GameBoardCellOptions.UNK;
  lastPlayed: PlayedTurn = {
    option: GameBoardCellOptions.UNK,
    cellIndex: [-1, -1]
  };
  turns: Array<PlayedTurn>;
  gameboard: GameBoard = {
    id: 1,
    cell: [GameBoardCellOptions.UNK, GameBoardCellOptions.UNK, GameBoardCellOptions.UNK,
      GameBoardCellOptions.UNK, GameBoardCellOptions.UNK, GameBoardCellOptions.UNK,
      GameBoardCellOptions.UNK, GameBoardCellOptions.UNK, GameBoardCellOptions.UNK],
      winIndices: [[0,1,2],[3,4,5],[6,7,8],
                   [0,3,6],[1,4,7],[2,5,8],
                   [0,4,8], [6,4,2]]
  };

  constructor() {}

  undo(){
    this.turns.pop();
    this.lastPlayed = this.turns[this.turns.length-1];
  }
  
  ngOnInit(): void {
    console.log(GameBoardCellOptions.getValues(this.lastPlayed.option))
    console.log(Object.values(GameBoardCellOptions))

    this.turns = [];
    this.turns.push(this.lastPlayed)
  }
}