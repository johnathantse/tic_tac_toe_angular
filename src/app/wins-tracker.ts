export class WinsTracker {
    row: Array<number>
    col: Array<number>
    diag: number
    antiDiag: number
    readonly boardSize = 3;

    constructor(){
        this.row = Array(0, 0, 0);
        this.col = Array(0, 0, 0);
        this.diag = 0;
        this.antiDiag = 0;
    }

    public addTurn(rowPlayed: number, colPlayed:number) {
        this.row[rowPlayed] += 1
        this.col[colPlayed] += 1
        if(rowPlayed == colPlayed){
            this.diag += 1
        }
        if(rowPlayed + colPlayed + 1 == this.boardSize){
            this.antiDiag += 1
        }

    }

    public undoTurn(rowPlayed: number, colPlayed: number){
        this.row[rowPlayed] -= 1
        this.col[colPlayed] -= 1
        if(rowPlayed == colPlayed){
            this.diag -= 1
        }
        if(rowPlayed + colPlayed + 1 == this.boardSize){
            this.antiDiag -= 1
        }

    }

    public calculateWin(rowPlayed: number, colPlayed:number): boolean{
        if(this.row[rowPlayed] == this.boardSize 
            || this.col[colPlayed] == this.boardSize 
            || this.diag == this.boardSize 
            || this.antiDiag == this.boardSize
        ){
            return true
        }
        else{
            return false
        }
    }
}
