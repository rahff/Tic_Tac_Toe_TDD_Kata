import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Case, Game } from 'src/core/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gridState$: BehaviorSubject<Case[]> = new BehaviorSubject(this.game.getGameGrid());

  constructor(private game: Game) { }
}
