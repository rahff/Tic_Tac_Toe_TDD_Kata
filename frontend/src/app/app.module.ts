import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Game } from 'src/core/Game';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: Game, useFactory: ()=> new Game()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
