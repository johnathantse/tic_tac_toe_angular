import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GameBoardCellOptions, GameCellState } from '../gameboard';

@Component({
  selector: 'app-gamecell-options',
  templateUrl: './gamecell-options.component.html',
  styleUrls: ['./gamecell-options.component.css'],
})
export class GamecellOptionsComponent implements OnInit {
  playerOptions = GameBoardCellOptions;
  
  @Input() public turns: Array<GameCellState>;
  @Input() public cellIdx!: [number, number];
  @Input() public gameCell: GameCellState;

  // @Output() public lastPlayedEmitter = new EventEmitter();
  @Output() public turnsEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // public onOptionSelected(event: any) {
  //   console.log(event);
  //   console.log(event.target.value);
  //   let newLastPlayed = new PlayedTurn(event.target.value, this.cellIdx);
  //   console.log(newLastPlayed);
  //   this.lastPlayedEmitter.emit(newLastPlayed);

  public getLastTurnOption() {
    console.log('retrieving last turn option');
    return this.turns[this.turns.length - 1].option;
  }

  getLastTurnIndex() {
    console.log('retrieving last turn  index');
    return this.turns[this.turns.length - 1].cellIndex;
  }

  public onOptionSelected(event: any) {
    let newLastPlayed = new GameCellState(event.target.value, this.cellIdx);
    this.turns.push(newLastPlayed);
    console.log('turns: ');
    console.log(this.turns);
    // console.log(newLastPlayed)
    this.turnsEmitter.emit(this.turns);
  }
}
