import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Case, Game } from 'src/core/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gridState$: BehaviorSubject<Case[]> = new BehaviorSubject(this.game.getGameGrid());

  constructor(private game: Game) { }

  public getGrid(): Observable<Case[]> {
    return this.gridState$.asObservable();
  }

  public playAtPosition(gridPosition: number): void {
    this.game.play(gridPosition);
  }
}
