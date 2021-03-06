import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GameBoardCellOptions, GameCellState } from '../models/GameCellState';

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
    let newLastPlayed = new GameCellState(
      event.target.value,
      true,
      this.gameCell.id
    );
    this.lastPlayedEmitter.emit(newLastPlayed);
  }
}
