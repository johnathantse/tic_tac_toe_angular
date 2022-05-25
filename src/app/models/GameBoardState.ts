import { GameBoard } from '../gameboard';
import { GameBoardCellOptions, GameCellState } from './GameCellState';

export class GameBoardState {
  private _lastPlayed: GameCellState;
  private _turns: Array<GameCellState>;
  private _hasPlayed: boolean;
  private _winner: string;

  private _tieGame: boolean;
  private _cells: Array<GameCellState>;
  private _turnsPlayed: number;

  constructor() {}

  public toJSON(): Object {
    return {
      lastPlayed: this._lastPlayed,
      turns: this._turns,
      hasPlayed: this._hasPlayed,
      winner: this._winner,
      tieGame: this._tieGame,
      cells: this._cells,
      turnsPlayed: this._turnsPlayed,
    };
  }

  public get winner(): string {
    return this._winner;
  }
  
  public set winner(value: string) {
    this._winner = value;
  }

  public get cells(): Array<GameCellState> {
    return this._cells;
  }

  public set cells(value: Array<GameCellState>) {
    this._cells = value;
  }

  public get lastPlayed(): GameCellState {
    return this._lastPlayed;
  }

  public set lastPlayed(value: GameCellState) {
    this._lastPlayed = value;
  }

  public get turns(): Array<GameCellState> {
    return this._turns;
  }

  public set turns(value: Array<GameCellState>) {
    this._turns = value;
  }

  public get hasPlayed(): boolean {
    return this._hasPlayed;
  }

  public set hasPlayed(value: boolean) {
    this._hasPlayed = value;
  }

  public get tieGame(): boolean {
    return this._tieGame;
  }

  public set tieGame(value: boolean) {
    this._tieGame = value;
  }

  public get turnsPlayed(): number {
    return this._turnsPlayed;
  }

  public set turnsPlayed(value: number) {
    this._turnsPlayed = value;
  }
}
