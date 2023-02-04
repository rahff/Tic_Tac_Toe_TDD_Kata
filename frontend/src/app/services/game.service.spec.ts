import { TestBed } from '@angular/core/testing';
import { Game } from 'src/core/Game';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Game, useFactory: () => new Game()
        }
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
