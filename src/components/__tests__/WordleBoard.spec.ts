
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '../../settings.ts'

// Unit tests for the WordleBoard component

describe('WordleBoard', () => {

  let wordOfTheDay = "TESTS"

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


  test.todo("no end-of-game appears if the user has not yet made a guess", async () => {

    // Arrange phase
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})


    // Assert phase
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)

  })

  test("If a word of the day provided does not have exactly 5 characters, a warning is emitted", async () => {

    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay: "FLY"}})

    expect(console.warn).toHaveBeenCalled()
    
  })

  test("If a word of the day is not all in uppercase, a warning is emitted", async() => {

    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay: "tests"}})

    expect(console.warn).toHaveBeenCalled()

  })

  test("If a word of the day is not a real word, a warning is emitted", async() => {

    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay: "QKFIR"}})

    expect(console.warn).toHaveBeenCalled()

  })

  test("if a real word of 5 characters and uppercase is provided, no warning is emitted", async() => {
    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    expect(console.warn).not.toHaveBeenCalled()
  })

  test("if a word is numbers a warning is emitted", async() => {
    console.warn = vi.fn()

    // Arrange phase
    mount(WordleBoard, {props: {wordOfTheDay: 123}})

    expect(console.warn).toHaveBeenCalled()
  })
})
