import chalk from 'chalk';
import { Game } from "../src/Game"
import { Player } from "../src/Player";
import * as CoinModule from '../src/Coin';

/**
 * Here we group the tests of type unit tests
 */
describe('Unit tests', () => {
  const player1 = new Player('Player One');
  const player2 = new Player('Player Two');

  let MockedCoinClass: jest.SpyInstance<CoinModule.Coin>;
  /**
   * @concept We can setup actions do be executed before each test
   * Usefull for environment setups and setting new mocks
   * Here before each test from this group, we setup a new mock for coin implementation
   */
  beforeEach(() => {
    MockedCoinClass = jest.spyOn(CoinModule, 'Coin');
  });
  /**
   * @concept We can setup actions do be executed after each test
   * Usefull for clean ups and reseting mocks
   * Here after each test, we clear the mock and restore the real implementation
   */
  afterEach(() => {
    MockedCoinClass.mockRestore();
  });
  /**
   * @concept To define a test we use the test or it method
   */
  test('Check that the correct player 1 starts when coin flip is head', () => {
    MockedCoinClass.mockImplementation(() => ({
      flip: () => 'heads',
    }));
    const game = new Game(player1, player2);
    expect(MockedCoinClass).not.toHaveBeenCalled();
    game.startGame();
    expect(MockedCoinClass).toHaveBeenCalledTimes(1);
    expect(game.nextPlayer).toBe(player1);
  });

  /**
   * @concept We can use the each method to reuse test blocks and parametrize the
   * inputs for the test
   */
  test.each([
    [player1, 'heads'],
    [player2, 'tails'],
    /**
     * @tip Here is a Typescript tip, 'as const' will give you a more faithful model
     * So it will know that the second parameter can be only 'heads' or 'tails' instead of a generic string
     */
  ] as const)( 
    'Check that the correct %s starts when coin flip is %s',
    //Here we receive the nth parameter from the array into the nth 
    //parameter for the test
    (whoShouldPlayFirst, theCoinFlipResult) => {
      MockedCoinClass.mockImplementation(() => ({
        flip: () => theCoinFlipResult,
      }));
      const game = new Game(player1, player2);
      expect(MockedCoinClass).not.toHaveBeenCalled();
      game.startGame();
      expect(MockedCoinClass).toHaveBeenCalledTimes(1);
      expect(game.nextPlayer).toBe(whoShouldPlayFirst);
    }
  );
})

//Scenarios
describe('Integration tests', () => {
  const player1 = new Player('Player One');
  const player2 = new Player('Player Two');

  /**
   * @remember When we are doing integration tests we should mock as little as possible
   * So the integration can be faithful to the real use case
   * In this case we only mock the 'environment' by controlling which 
   * value the random call returns
   */

   /**
    * @concept We can also use the each method to reuse describe blocks
    */
  describe.each([
    [player1, 0.2],
    [player2, 0.8]
  ] as const)('Should set first player correctly', (whoShouldPlayFirst, theRandomValueWhenRunningTheTest) => {
    //Here we use a small styling just to make clear what is parameter for the test
    test(`${chalk.green(chalk.bold(whoShouldPlayFirst.name))} starts when coin flip random results in ${chalk.green(chalk.bold(theRandomValueWhenRunningTheTest))}`, () => {
      global.Math.random = () => theRandomValueWhenRunningTheTest;
      const game = new Game(player1, player2);
      game.startGame();
      expect(game.nextPlayer).toBe(whoShouldPlayFirst);
    })
  })

  /**
   * @concept A test can be prepared and included on the test suite
   * but requiring implementation
   * 
   * For this we use the .todo method
   */
  test.todo('Test the draw card is made by each player when starting')
  /**
   * @concept A test can be skipped inside a test suite by using the .skip method
   */
  test.skip('Test the draw card is made by each player when starting', () => {
    const game = new Game(player1, player2);
    game.startGame();
    game.drawCards();
  })
})