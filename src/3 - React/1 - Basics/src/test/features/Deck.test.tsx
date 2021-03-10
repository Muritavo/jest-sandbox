
import { render } from "@testing-library/react";
import Deck from "../../features/Deck";
import {Player as PlayerModel} from "../../models/Player";

const mockDeck = [
    {
      "name": "Charmander",
      "hp": 30,
      "pokemonType": "Fire"
    },
    {
      "name": "Bulbasaur",
      "hp": 30,
      "pokemonType": "Grass"
    },
    {
      "name": "Squirtle",
      "hp": 50,
      "pokemonType": "Water"
    }
  ]

it('Should wait for deck to load', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(mockDeck) }) as any
      );
    const mockPlayer = new PlayerModel('MOCK ID', 'MOCK NAME');
    const wrapper = render(<Deck player={mockPlayer}/>);

    wrapper.getByText('...Loading');

    await wrapper.findByText(mockDeck[0].name);
});