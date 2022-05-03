import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GameCellState, GameBoardCellOptions } from "../GameCellState";

@Component({
  selector: 'app-gamecell-options',
  templateUrl: './gamecell-options.component.html',
  styleUrls: ['./gamecell-options.component.css'],
})
export class GamecellOptionsComponent implements OnInit {
  playerOptions = GameBoardCellOptions;
  
  @Input() public lastPlayed: GameCellState;
  @Input() public defaultSelected: GameBoardCellOptions;
  @Input() public gameCell: GameCellState;

  @Output() public lastPlayedEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onOptionSelected(event: any) {
    let newLastPlayed = new GameCellState(event.target.value, this.gameCell.cellIndex, true);
    this.lastPlayedEmitter.emit(newLastPlayed)
  }
}
