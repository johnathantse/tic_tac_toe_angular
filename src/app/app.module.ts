import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GamecellOptionsComponent } from './gamecell-options/gamecell-options.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WinnerModalComponent } from './winner-modal/winner-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    GamecellOptionsComponent,
    WinnerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
