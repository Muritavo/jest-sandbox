import { Game } from "../src/Game"
import { Player } from "../src/Player";
import * as CoinModule from '../src/Coin';

//Units
describe('Unit tests', () => {
  let MockedCoinClass: jest.SpyInstance<CoinModule.Coin>;
  beforeEach(() => {
    //Here we replace the current Coin implementation with 'a simpler version'
    MockedCoinClass = jest.spyOn(CoinModule, 'Coin');
  });
  afterEach(() => {
    MockedCoinClass.mockRestore();
  });
  /**
   * Here we are testing that the correct player is set on the next to play
   * based on some result from a coin flip
   *
   * Since we do not want to rely on the implementation details of a coin flip
   * That could grow accross the lifetime of the project, we will mock this dependency
   * So that we always have a controlled result
   */
  test('Check that the correct player starts based on the coin flip', () => {
    //Here we make so that the intanciation of the class (new Coin)
    //returns our own instance implementation
    MockedCoinClass.mockImplementation(() => ({
      flip() {
        return 'heads';
      },
    }));
    const player1 = new Player('1');
    const player2 = new Player('2');

    const game = new Game(player1, player2);
    //We expect that no coin was referenced yet
    expect(MockedCoinClass).not.toHaveBeenCalled();
    //We trigger our unit that will be instanciating and flipping the coin
    //And test the results
    game.startGame();
    //We expect now that the coin has been created
    expect(MockedCoinClass).toHaveBeenCalledTimes(1);
    //We expect that given the flip result is 'heads' the player 1 starts the game
    expect(game.nextPlayer).toBe(player1);
  });
})

//Scenarios
describe('Integration tests', () => {
    /**
     * Here we also are testing that the correct player is set on the next to play
     * based on some result from a coin flip
     * 
     * Since we are trying to guarantee that the Game works well with the current
     * coin implementation, we let the Real coin be instanced
     */
    test('Check that the correct player starts based on the coin flip', () => {
        const player1 = new Player('1');
        const player2 = new Player('2');

        const game = new Game(player1, player2);
        
        //Since the Coin requires a random value, let's control the result
        //of this random to control our result
        global.Math.random = () => 0.2;

        //We trigger our unit that will be instanciating and flipping the coin
        //And test the results
        game.startGame();
        
        //We expect that given the flip result is 'heads' the player 1 starts the game
        expect(game.nextPlayer).toBe(player1);
    })
})