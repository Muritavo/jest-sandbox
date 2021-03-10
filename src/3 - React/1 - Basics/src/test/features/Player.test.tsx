import { render } from "@testing-library/react";
import Player from "../../features/Player";
import {Player as PlayerModel} from "../../models/Player";

it('Should display the player data when render', () => {
    const mockPlayer = new PlayerModel('MOCK ID', 'MOCK NAME');
    /** @concept This component doesn't have any async integration, so a simple render is enough */
    const wrapper = render(<Player player={mockPlayer}/>);
    
    /** @concept When we are validating with rendered elements, we interact with the dom elements, not react components */
    const someElementWithId = wrapper.getByText(mockPlayer.id);
    const someElementWithText = wrapper.getByText(mockPlayer.name);

    expect(someElementWithId).toBeDefined();
    expect(someElementWithText).toBeDefined();
})