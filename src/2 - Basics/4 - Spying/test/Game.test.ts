import { Game } from '../src/Game';
import { Player } from '../src/Player';
import * as CoinModule from '../src/Coin';

//Units
describe('Unit tests', () => {
  let MockedCoinClass: jest.SpyInstance<CoinModule.Coin>;
  beforeEach(() => {
    /**
     * @concept A more flexible mocking solution is the spyOn function
     * It binds to a module function, and allows for managing it,
     * inspecting, replacing, etc..
     */
    
     //Here we bind to the Coin class exported by the Coin module
    MockedCoinClass = jest.spyOn(CoinModule, 'Coin');
  });
  afterEach(() => {
    //After each test, we remove the mocks and restore to the original function
    MockedCoinClass.mockRestore();
  });
  test('Check that the correct player starts based on the coin flip', () => {
    //Here we replace the current coin implementation with a custom implementation
    MockedCoinClass.mockImplementation(() => ({
      flip() {
        return 'tails';
      },
    }));
    const player1 = new Player('1');
    const player2 = new Player('2');
    const game = new Game(player1, player2);
    game.startGame();
    expect(game.nextPlayer).toBe(player2);
  });
});
