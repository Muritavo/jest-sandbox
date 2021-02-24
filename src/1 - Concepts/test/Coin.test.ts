import { Coin } from '../src/Coin';

describe('Unit tests', () => {
    //Provides code isolation
    //Doesn`t rely on dependencies
    /**
     * For this example, let`s test a coin flip.
     * The result of this coin flip is used to decide the player orders later
     * Right now we test the unit that decides if a coin flip is heads or tails
     * 
     * There is no dependencies so it's a unit test by default
     */
    test('Checks that a coin flip is heads or tails', () => {
      const CoinInstance = new Coin();
      global.Math.random = () => 0.3;
      expect(CoinInstance.flip()).toBe('heads');
    });
})

//Integration tests
/**
 * Since there is no modules to integrate with on the Coin implementation
 * there is no need for integration tests
 */
describe.skip('Integration tests', () => {});