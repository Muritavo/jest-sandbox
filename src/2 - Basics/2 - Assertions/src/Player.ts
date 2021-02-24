import { Card } from "./Card";
import { shuffle } from 'lodash';

export class Player {
    name: string;
    deck?: Card[];

    constructor(name: string) {
        this.name = name;
    }

    shuffleDeck() {
        if (this.deck === undefined) {
            throw new Error('The deck has not been initialized yet')
        }
        this.deck = shuffle(this.deck);
    }

    drawCards() {
        return this.deck!.slice(0, 7);
    }
}