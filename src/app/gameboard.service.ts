import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameBoard } from './gameboard';
import { GameCellState, GameBoardCellOptions } from './GameCellState';
import { environment } from '../environments/environment';
import { GameBoardState } from './models/GameBoardState';

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  constructor(private http: HttpClient) {}

  // loadGame(): Observable<HttpResponse<GameBoardState>> {
  //   return this.http.get<GameBoardState>(environment.apiUrl + '/gameboard', {
  //     observe: 'response',
  //   });
  // }
  loadGame(): Observable<GameBoardState> {
    return this.http.get<GameBoardState>(environment.apiUrl + '/gameboard');
  }

  saveGame(
    gameBoardState: GameBoardState
  ): Observable<HttpResponse<GameBoardState>> {
    return this.http.put<GameBoardState>(
      environment.apiUrl + '/gameboard',
      gameBoardState,
      {
        observe: 'response',
      }
    );
  }
}
