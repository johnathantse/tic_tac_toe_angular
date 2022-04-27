import { Component, OnInit } from '@angular/core';
import { GameBoard, GameBoardCellOptions } from '../gameboard';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  readonly size = [...Array(3).keys()];
  lastPlayed = GameBoardCellOptions.UNK;
  constructor() {}

  ngOnInit(): void {
    console.log(GameBoardCellOptions.getValues(this.lastPlayed))
    console.log(Object.values(GameBoardCellOptions))
  }
}