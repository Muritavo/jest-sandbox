/**
 * @concept RTL vs Enzyme: 
 */
import { act, render } from "@testing-library/react";
import Player from "../../features/Player";
import {Player as PlayerModel} from "../../models/Player";

const mockPlayer = new PlayerModel('MOCK ID', 'MOCK NAME');

it('Should display the player data when render', () => {
    /** @concept This component doesn't have any async integration, so a simple render is enough */
    const wrapper = render(<Player player={mockPlayer}/>);
    
    /** @concept When we are validating with rendered elements, we interact with the dom elements, not react components */
    const someElementWithId = wrapper.getByText(mockPlayer.id);
    const someElementWithText = wrapper.getByText(mockPlayer.name);
    const someElementWithDeck = wrapper.queryByText("Deck");

    expect(someElementWithId).toBeDefined();
    expect(someElementWithText).toBeDefined();
    expect(someElementWithDeck).toBeNull();
})