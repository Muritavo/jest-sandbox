import { Game } from '../src/Game';
import { Player } from '../src/Player';

/**
 * @concept The easiest way to mock a module, is to call the mock function
 * There are some caveats discussed below
 */
jest.mock('../src/Coin', () => ({
  Coin: class {
    flip() {
      return 'heads';
    }
  },
}));

//Units
describe('Unit tests', () => {
  test('Check that the correct player starts based on the coin flip', () => {
    const player1 = new Player('1');
    const player2 = new Player('2');
    const game = new Game(player1, player2);
    game.startGame();
    expect(game.nextPlayer).toBe(player1);
  });

  describe('Caveats when mocking modules', () => {
    /**
     * @caveat This kind of works, but since it`s being executed
     * after the imports, the dependants (Game) will not get the mocked version
     */
    /**
     * @suggestion If the test needs both implementation MOCKED & UNMOCKED or Multiple mocks
     * It's suggested to use the spyOn instead of mock
     */
    jest.mock('../src/Coin', () => ({
      Coin: class {
        flip() {
          throw new Error('a mocked error');
        }
      },
    }))
    test.skip('Mocks are done based on where they are located', () => {
      const player1 = new Player('1');
      const player2 = new Player('2');
      const game = new Game(player1, player2);
      expect(() => game.startGame()).toThrow();
    })
  })
});
