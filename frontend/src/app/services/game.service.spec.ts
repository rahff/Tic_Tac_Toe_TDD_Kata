import { fakeAsync, TestBed } from '@angular/core/testing';
import { Case, Game, Sign } from 'src/core/Game';

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

  it("should have an empty grid at the begining", fakeAsync(()=>{
    service.getGrid().subscribe((grid: Case[])=> {
      expect(grid).toEqual([
      {position: 1, sign: Sign.EMPTY}, {position: 2, sign: Sign.EMPTY}, {position: 3, sign: Sign.EMPTY}, 
      {position: 4, sign: Sign.EMPTY}, {position: 5, sign: Sign.EMPTY}, {position: 6, sign: Sign.EMPTY},
      {position: 7, sign: Sign.EMPTY}, {position: 8, sign: Sign.EMPTY}, {position: 9, sign: Sign.EMPTY}]);
    })
  }));

  it("should put the current player s sign on the choosen case", fakeAsync(()=> {
    service.playAtPosition(5);
    service.getGrid().subscribe((grid: Case[]) => {
      expect(grid[4].sign).toBe(Sign.X);
      service.getHeaderCase().subscribe((cell: Case)=> {    
        expect(cell).toEqual({position: 0, sign: Sign.O})
      })
    })
  }))
  
});
