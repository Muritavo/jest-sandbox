import { Player } from "../src/Player";
import * as CoinModule from '../src/Coin';
import { Game } from "../src/Game";
import { Coin } from "../../../1 - Concepts/src/Coin";

describe('Unit tests', () => {
    const player1 = new Player('Player One');
    const player2 = new Player('Player Two');
  
    let MockedCoinClass: jest.SpyInstance<CoinModule.Coin>;
    beforeEach(() => {
      MockedCoinClass = jest.spyOn(CoinModule, 'Coin');
    });
    afterEach(() => {
      MockedCoinClass.mockRestore();
    });
    /**
     * @concept TestingMockedClasses When testing over a class dependency
     * we can use the mock property to check for instances and method calls
     */
    test('Check that the correct player 1 starts when coin flip is head', () => {
    //Here we mock class implementation
      MockedCoinClass.mockImplementation(function(this: Coin) {
          /**
           * @caveat This implementation using funtion + this 
           * is required so the mock.instances can be set
           */
          this.flip = jest.fn(() => 'heads');
          return this;
      });
      const game = new Game(player1, player2);
      //Here we know as of our implementation, that the coin is:
      //instanciated 1 time
      //This instance has the flip called
      game.startGame();
      //So we can test it, let's break down what is being done
      //We get the first instance from the index of instanciations
      const theInstance = MockedCoinClass.mock.instances[0];
      //We check if this instance has it's flip method called one time only
      expect(theInstance.flip).toHaveBeenCalledTimes(1);
    });
});