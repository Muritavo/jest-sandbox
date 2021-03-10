import { PokemonTypes } from "./types";

export class Card {
    name: string;
    hp: number;
    pokemonType: PokemonTypes;

    constructor(name: string, hp: number, type: PokemonTypes) {
        this.name = name;
        this.hp = hp;
        this.pokemonType = type;
    }
}