import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GameBoardCellOptions } from '../gameboard';

@Component({
  selector: 'app-gamecell-options',
  templateUrl: './gamecell-options.component.html',
  styleUrls: ['./gamecell-options.component.css'],
})
export class GamecellOptionsComponent implements OnInit {
  playerOptions = GameBoardCellOptions;
  @Input() public lastPlayed!: GameBoardCellOptions;
  @Output() public lastPlayedEmitter = new EventEmitter(); 
  
  constructor() {
  }

  ngOnInit(): void {}

  public onOptionSelected(event: any) {
    console.log(event);
    this.lastPlayedEmitter.emit(event.target.value);
  }

}
