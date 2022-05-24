import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { GameBoardState } from './models/GameBoardState';

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      // () => new Error('Something bad happened; please try again later.')
      () =>
        new Error(
          'Error occured with status: ' + error.status + ' ' + error.error
        )
    );
  }

  loadGame(): Observable<GameBoardState> {
    return this.http
      .get<GameBoardState>(environment.apiUrl + '/gameboard')
      .pipe(catchError(this.handleError));
  }

  // saveGame(
  //   gameBoardState: GameBoardState
  // ): Observable<HttpResponse<GameBoardState>> {
  //   return this.http
  //     .put<GameBoardState>(environment.apiUrl + '/gameboard1', gameBoardState, {
  //       observe: 'response',
  //     })
  //     .pipe(catchError(this.handleError));
  // }

  saveGame(gameBoardState: GameBoardState): Observable<GameBoardState> {
    return this.http
      .put<GameBoardState>(environment.apiUrl + '/gameboard', gameBoardState)
      .pipe(catchError(this.handleError));
  }
}
