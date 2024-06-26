
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '../../settings.ts'

// Unit tests for the WordleBoard component

describe('WordleBoard', () => {


   let wordOfTheDay = "TESTS"

  describe("End of the game messages", () => {

    // test 1

    test("a defeat message appears if the user makes a guess that is incorrect", async () => {

      // Arrange phase
      const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  
      // Act phase
      const guessInput = wrapper.find("input[type=text")
      await guessInput.setValue("WRONG")
      await guessInput.trigger("keydown.enter")
  
      // Assert phase
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  
    })
  
    // test 2
  
    test("no end-of-game appears if the user has not yet made a guess", async () => {
  
      // Arrange phase
      const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  
  
      // Assert phase
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  
    })

    // test 3

    test("a victory message appears when the user makes a guess that matches the word of the day", async () => {
    
      // Arrange phase
      const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  
      // Act phase
      const guessInput = wrapper.find("input[type=text")
      await guessInput.setValue("TESTS")
      await guessInput.trigger("keydown.enter")
  
      // Assert phase
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

  })

  describe("Rules for defining word of the day", () => {

    test.each(
      [
        {wordOfTheDay: "FLY", reason: "Word of the day must have 5 characters"},
        {wordOfTheDay: "tests", reason: "Word of the day must be all in upper case"},
        {wordOfTheDay: "QWERT", reason: "Word of the day must be a valid English word"},
      ]
    )("Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted", async ({wordOfTheDay}) => {

    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay}})

    expect(console.warn).toHaveBeenCalled()
    
  })
  

  // test 2

  test("if a real word of 5 characters and uppercase is provided, no warning is emitted", async() => {
    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    expect(console.warn).not.toHaveBeenCalled()
  })

  })

  describe("Player input", () => {
    test("player guesses are limited to 5 letters", async() => {
      await playerSubmitsGuess(wordOfTheDay + "EXTRA")

      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

  })

  

})
