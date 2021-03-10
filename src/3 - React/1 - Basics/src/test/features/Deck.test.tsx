
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
    /** @concept This component doesn't have any async integration, so a simple render is enough */
    const wrapper = render(<Deck player={mockPlayer}/>);

    /** @concept In this moment the async function has not been executed yet */
    wrapper.getByText('...Loading');

    /** 
     * @concept We need to have a way to know when the async function resolves, this can be made
     * using timeout. Here we are using the findX() to wait until X is true
     */
    await wrapper.findByText(mockDeck[0].name);
});