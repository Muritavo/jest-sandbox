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
  //Before each test from this group, we setup a new mock for coin implementation
  beforeEach(() => {
    MockedCoinClass = jest.spyOn(CoinModule, 'Coin');
  });
  //After each test, we clear the mock and restore the real implementation
  afterEach(() => {
    MockedCoinClass.mockRestore();
  });
  //Here we setup a single test
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
  //Here we setup a more dynamic test, with multiple cases
  test.each([
    [player1, 'heads'],
    [player2, 'tails'],
    //Here is a Typescript tip, 'as const' will give you a more faithful model 
    //So it will know that the second parameter can be only 'heads' or 'tails' instead of a generic string
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

  //We can also use the each method on describe blocks

  //Remembering: When we are doing integration tests we should mock as little as possible
  //So the integration can be faithful to the real use case
  //In this case we only mock the 'environment' by controlling which 
  //value the random call returns
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
})