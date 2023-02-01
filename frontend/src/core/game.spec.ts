import { Game, Sign } from "./Game";



describe('Tic Tac Toe game', ()=> {
    let game: Game;

    beforeEach(()=>{
        game = new Game();
    })

    it("player 1 is X, it plays fisrt", ()=>{
        expect(game.getCurrentPlayer()).toBe(Sign.X);
    })

    it("player 2 is O, it plays after", ()=>{
        game.play(2);
        expect(game.getCurrentPlayer()).toBe(Sign.O);
        game.play(1);
        expect(game.getCurrentPlayer()).toBe(Sign.X);
    })

    it("players can put his sign on a case", ()=>{
        game.play(5);
        expect(game.getSignOnPosition(5)).toBe(Sign.X);
        game.play(1);
        expect(game.getSignOnPosition(1)).toBe(Sign.O);
    });

    it("players cannot put his sign on the same case", ()=>{
        game.play(5);
        expect(game.getSignOnPosition(5)).toBe(Sign.X);
        game.play(5);
        expect(game.getSignOnPosition(5)).toBe(Sign.X);
    });

    it("players who plays on a wrong position keep the hand", ()=>{
        game.play(5);
        expect(game.getSignOnPosition(5)).toBe(Sign.X);
        game.play(5);
        expect(game.getSignOnPosition(5)).toBe(Sign.X);
        expect(game.getCurrentPlayer()).toBe(Sign.O);
        game.play(2);
        expect(game.getCurrentPlayer()).toBe(Sign.X);
    });
    
    it("player O who align vertically 9 6 3 position of his sign terminate the game", ()=>{
        game.play(1);
        game.play(9);
        game.play(5);
        game.play(6);
        game.play(2);
        game.play(3);
        expect(game.isTerminate()).toBeTrue();
    })

    it("player X who align vertically 8 5 2 position of his sign terminate the game", ()=>{
        game.play(8);
        game.play(4);
        game.play(5);
        game.play(6);
        game.play(2);
        expect(game.isTerminate()).toBeTrue();
    });

    it("player X alins horizontally 7 8 9 terminate the game", ()=>{
        game.play(7);
        game.play(1);
        game.play(8);
        game.play(4);
        game.play(9);
        expect(game.isTerminate()).toBeTrue();
    })

    it("player O alins horizontally 4 5 6 should be the winner of the game", ()=>{
        game.play(1);
        game.play(4);
        game.play(7);
        game.play(5);
        game.play(2);
        game.play(6);
        expect(game.isTerminate()).toBeTrue();
        expect(game.getWinner()).toBe(Sign.O);
    })

    it("player X alins horizontally 7 8 9 should be the winner of the game", ()=>{
        game.play(7);
        game.play(1);
        game.play(8);
        game.play(4);
        game.play(9);
        expect(game.getWinner()).toBe(Sign.X);
    })

    it("player O alins diagonally 7 5 3 should be the winner of the game", ()=>{
        game.play(7);
        game.play(1);
        game.play(5);
        game.play(4);
        game.play(3);
        expect(game.getWinner()).toBe(Sign.X);
    })

    it("cannot plays anymore when the game is terminated", ()=>{
        game.play(1);
        game.play(2);
        game.play(5);
        game.play(4);
        game.play(9); //terminated here
        game.play(7); // Player O try to play nothing happens here
        expect(game.getSignOnPosition(7)).toBe(Sign.EMPTY);
        expect(game.getCurrentPlayer()).toBe(Sign.X);
        expect(game.getWinner()).toBe(Sign.X);
    })

    it("player X and O fullfil all cases without make any alignment terminate the game without winner", ()=>{
        game.play(2);
        game.play(3);
        game.play(6);
        game.play(1);
        game.play(9);
        game.play(8);
        game.play(5);
        game.play(4);
        game.play(7);
        expect(game.isTerminate()).toBeTrue();
        expect(game.getWinner()).toBeNull()
    })

})