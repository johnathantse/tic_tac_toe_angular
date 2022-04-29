import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GameBoardCellOptions, GameCellState } from '../gameboard';

@Component({
  selector: 'app-gamecell-options',
  templateUrl: './gamecell-options.component.html',
  styleUrls: ['./gamecell-options.component.css'],
})
export class GamecellOptionsComponent implements OnInit {
  playerOptions = GameBoardCellOptions;
  
  @Input() public cellIdx!: [number, number];
  @Input() public lastPlayed: GameCellState;
  @Input() public defaultSelected: GameBoardCellOptions;

  @Output() public lastPlayedEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onOptionSelected(event: any) {
    let newLastPlayed = new GameCellState(event.target.value, this.cellIdx, true);
    this.lastPlayedEmitter.emit(newLastPlayed)
  }
}
