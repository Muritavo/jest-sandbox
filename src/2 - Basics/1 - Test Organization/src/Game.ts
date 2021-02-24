import { Coin } from "./Coin";
import { Player } from "./Player";

export class Game {
    player1: Player;
    player2: Player;

    nextPlayer?: Player = undefined;

    constructor(p1: Player, p2: Player) {
        this.player1 = p1;
        this.player2 = p2;
    }

    startGame() {
        const coin = new Coin();
        if (coin.flip() === 'heads') {
            this.nextPlayer = this.player1
        } else {
            this.nextPlayer = this.player2;
        }
    }

    drawCards() {
        throw new Error('Method not implemented yet');
    }
}