import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GameBoardCellOptions, PlayedTurn } from '../gameboard';

@Component({
  selector: 'app-gamecell-options',
  templateUrl: './gamecell-options.component.html',
  styleUrls: ['./gamecell-options.component.css'],
})
export class GamecellOptionsComponent implements OnInit {
  playerOptions = GameBoardCellOptions;
  // newLastPlayed = LastPlayed;
  @Input() public lastPlayed!: PlayedTurn;
  // @Input() public turns: Array<PlayedTurn>;
  @Input() public cellIdx!:[number, number];

  @Output() public lastPlayedEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {}

  public onOptionSelected(event: any) {
    console.log(event);
    console.log(event.target.value);
    let newLastPlayed = new PlayedTurn(event.target.value, this.cellIdx);
    console.log(newLastPlayed);
    this.lastPlayedEmitter.emit(newLastPlayed);
  }

}
