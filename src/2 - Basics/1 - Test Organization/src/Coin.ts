export class Coin {
    flip() {
        return Math.random() < 0.5 ? 'heads' : 'tails';
    }
}