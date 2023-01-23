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
        const verticalAlignment = this.checkVerticals();
        const horizontalAlignment = this.checkHorizontals();
        const diagonalAlignment = this.checkDiagonals();
        return verticalAlignment || horizontalAlignment || diagonalAlignment;
    }

    private checkVerticals(): boolean {
        let isAlignment = false;
        for (let i = 1; i <= 3; i++) {
            isAlignment = this.checkColumn(i);
            if(isAlignment) break;
        }
        return isAlignment;
    }

    private checkHorizontals(): boolean {
        let isAlignment = false;
        for (let i = 1; i <= 3; i++) {
            isAlignment = this.checkRaw(i);
            if(isAlignment) break;
        }
        return isAlignment;
    }

    private checkDiagonals(): boolean {
        let isAlignment = false;
        for (let i = 1; i <= 2; i++) {
            isAlignment = this.checkDiagonal(i);
            if(isAlignment) break;
        }
        return isAlignment;
    }
    
    private checkColumn(column: number): boolean {
        const currentColumn = this.getColumn(column);    
        const line = [this.cases[currentColumn[0]], this.cases[currentColumn[1]], this.cases[currentColumn[2]]];
        const isAlignment = line[0].sign == line[1].sign 
                            && line[1].sign == line[2].sign 
                            && line[0].sign !== Sign.EMPTY;
        return isAlignment;
    }

    private checkRaw(raw: number): boolean {
        const currentRow = this.getRaw(raw);    
        const line = [this.cases[currentRow[0]], this.cases[currentRow[1]], this.cases[currentRow[2]]];
        const isAlignment = line[0].sign == line[1].sign 
                            && line[1].sign == line[2].sign 
                            && line[0].sign !== Sign.EMPTY;
        
        return isAlignment;
    }

    private checkDiagonal(diag: number): boolean {
        const currentDiagonal = this.getDiagonal(diag);    
        const line = [this.cases[currentDiagonal[0]], this.cases[currentDiagonal[1]], this.cases[currentDiagonal[2]]];
        const isAlignment = line[0].sign == line[1].sign 
                            && line[1].sign == line[2].sign 
                            && line[0].sign !== Sign.EMPTY;
        
        return isAlignment;
    }

    private getColumn(col: number): number[]{
        switch (col) {
            case 1:
                return [1, 4, 7];
            case 2:
                return [2, 5, 8];
            case 3:
                return [3, 6, 9];
            default: throw new Error("column is out of bound");
        }
    }

    private getRaw(raw: number): number[]{
        switch (raw) {
            case 1:
                return [1, 2, 3];
            case 2:
                return [4, 5, 6];
            case 3:
                return [7, 8, 9];

            default: throw new Error("raw is out of bound");
        }
    }

    private getDiagonal(diag: number): number[]{
        switch (diag) {
            case 1:
                return [7, 5, 3];
            case 2:
                return [1, 5, 9];
    
            default: throw new Error("diag is out of bound");
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