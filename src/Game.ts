interface Case {
    position: number;
    sign: Sign
}

export class Game {

    private terminated = false;
    private currentPlayer: Sign;
    private cases: Case[] = [{position: 0, sign: Sign.EMPTY}, // we keep this case EMPTY to begin at index 1 for simplicity
        {position: 1, sign: Sign.EMPTY}, {position: 2, sign: Sign.EMPTY}, {position: 3, sign: Sign.EMPTY}, 
        {position: 4, sign: Sign.EMPTY}, {position: 5, sign: Sign.EMPTY}, {position: 6, sign: Sign.EMPTY},
        {position: 7, sign: Sign.EMPTY}, {position: 8, sign: Sign.EMPTY}, {position: 9, sign: Sign.EMPTY}]
    
    constructor(){
        this.currentPlayer = Sign.X;
    }

    public getCurrentPlayer(): Sign {
        return this.currentPlayer;
    }

    public play(position: number): void {
        if(this.enablePlayAtPosition(position)){
            this.cases[position].sign = this.currentPlayer;
            this.terminated = this.checkAlignment();
            if(this.terminated) return;
            this.swapPlayerRole();
        } 
    }

    private enablePlayAtPosition(position: number): boolean {
        return this.cases[position].sign == Sign.EMPTY && !this.terminated
    }

    private checkAlignment(): boolean {
        let isAlignment = false;
        for (let i = 1; i < this.cases.length-1; i++) {
            isAlignment = this.checkLines(i);
            if(isAlignment) break;
        }
        return isAlignment;
    }

    private checkLines(line: number): boolean {
        const currentColumn = this.getLine(line);    
        const checkedLine = [this.cases[currentColumn[0]], this.cases[currentColumn[1]], this.cases[currentColumn[2]]];
        const isAlignment = checkedLine[0].sign == checkedLine[1].sign 
                            && checkedLine[1].sign == checkedLine[2].sign 
                            && checkedLine[0].sign !== Sign.EMPTY;
        return isAlignment;
    }

    private getLine(line: number): number[]{
        switch (line) {
            case 1:
                return [1, 4, 7];
            case 2:
                return [2, 5, 8];
            case 3:
                return [3, 6, 9];
            case 4:
                return [1, 2, 3];
            case 5:
                return [4, 5, 6];
            case 6:
                return [7, 8, 9];
            case 7:
                return [7, 5, 3];
            case 8:
                return [1, 5, 9];
        
            default: throw new Error("line is out of bound");
        }
    }

    private swapPlayerRole(): void {
        this.currentPlayer = this.currentPlayer === Sign.X ? Sign.O : Sign.X;
    }

    public getSignOnPosition(position: number): Sign {
        return this.cases[position].sign;
    }

    public isTerminate(): boolean {
        return this.terminated;
    }

    public getWinner(): Sign | null {
        if(this.terminated){
            return this.currentPlayer;
        }
        return null;
    }
}



export enum Sign { X="X", O="O", EMPTY="EMPTY" }