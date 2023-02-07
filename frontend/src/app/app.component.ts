import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Case } from 'src/core/Game';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public gridState$: Observable<Case[]> = new Observable();
  public currentPlayer$: Observable<Case> = new Observable();
  constructor(private gameService: GameService){}

  ngOnInit(): void {
    this.gridState$ = this.gameService.getGrid();
    this.currentPlayer$ = this.gameService.getHeaderCase();
  }

  public play(atPosition: number): void {
    this.gameService.playAtPosition(atPosition);
  }

}
