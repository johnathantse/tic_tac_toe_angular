import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GamecellOptionsComponent } from './gamecell-options/gamecell-options.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WinnerModalComponent } from './game-end-modal/game-end-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { GameAlertsComponent } from './game-alerts/game-alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    GamecellOptionsComponent,
    WinnerModalComponent,
    ConfirmModalComponent,
    GameAlertsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
