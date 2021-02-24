import {Player} from '../src/Player';
import * as CardModule from '../src/Card';
import * as _ from 'lodash';

function createDeck() {
  /** The initialization doesn`t matter here, we only want a deck with n objects */
  return Array(60)
    .fill(undefined)
    .map(() => new CardModule.Card('', 0, 'colorless'));
}

describe('Unit tests', () => {
  /**
   * @remember When creating a unit test, the dependencies should be mocked
   * so the logic can be test isolated from other dependencies implementations
   */
  beforeEach(() => {
    jest
      .spyOn(CardModule, 'Card')
      .mockImplementation(jest.fn(() => ({
          name: String(Math.random())
      } as CardModule.Card)));

      /** 
       * @byTheBook To isolate the code we should mock the lodash.shuffle dependency
       * 
       * @burnTheBook It makes the test creation cumbersome so it's only suggested if you need
       * control over the result
       */
    jest
      .spyOn(_, 'shuffle')
      .mockImplementation(
        jest.fn((someArray: any) => someArray.reverse())
      );
  });
  /**
   * @concept TestingExpections Testing expected rejections
   * When a function is supposed to throw an expection
   * Jest provides a method toThrow(The message/regex for the error message)
   */
  test('Should reject if the deck has not been loaded yet', () => {
    const player = new Player('Player One');
    expect(() => player.shuffleDeck()).toThrow(
      'The deck has not been initialized yet'
    );
  });

  /**
   * @caveat The function that throws the exception should not be called directly
   * Instead it should be passed as a wrapped function to the expect call
   * This works: expect(() => thisShouldThrowAnException())
   * This don`t: expect(thisShouldThrowAnException())
   */
  describe('Caveats when testing exceptions', () => {
    const thisShouldThrowAnException = () => {
        throw Error('Expected error');
    };
    test('A function that throws an error should be wrapped in another function', () => {
        expect(() => thisShouldThrowAnException()).toThrow();
    })
    test.skip('It will fail if the exception is thrown immediatly', () => {
      expect(thisShouldThrowAnException()).toThrow();
    });
  })

  /**
   * @concept TestingForEquality When we are testing objects/arrays to be equal to something we should
   * use the toEqual() function as it compares the props not instance
   */
  test('Should shuffle the deck correctly', () => {
    const player = new Player('Player One');
    const deckMock = createDeck();
    player.deck = deckMock;
    player.shuffleDeck();
    expect(player.deck).not.toEqual(deckMock);
  });

  /**
   * @caveat If we use toBe() it will be comparing instance and can fail without a clear
   * error
   * This works: 
   * var a = {b: 'c'}; 
   * expect(a).toBe(a);
   * 
   * This doesn`t (because the object are the same but their instances (when were created) are different)
   * var a = {b: 'c'}; 
   * expect(a).toBe({b: 'c'});
   */
  describe('Caveat when comparing objects', () => {
      test('toBe compares instances', () => {
        var a = {b: 'c'}; 
        expect(a).toBe(a);
      })
      test.skip('toBe will fail when the instances are different, even though the content is the same', () => {
        var a = {b: 'c'}; 
        expect(a).toBe({ b: 'c' });
        //It should be used toEqual instead (comment the line above to pass the test)
        expect(a).toEqual({ b: 'c' });
      })
  })


  /**
   * @concept TestingForElements When we are testing that elements are container in an array,
   * we can use the .arrayContaining(theExpectedValues) function
   */
  test('Should draw the 7 cards from the top of the deck', () => {
    const player = new Player('Player One');
    const deckMock = createDeck();
    player.deck = deckMock;
    player.shuffleDeck();
    const drawedCards = player.drawCards();
    expect(player.deck.slice(0,7)).toEqual(drawedCards);
    expect(drawedCards).toHaveLength(7);
  });
});