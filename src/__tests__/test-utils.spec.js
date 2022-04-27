import { buildWordsArray, getWordPositions } from "../components/utils";
import { selectionGenerator } from "./generators/selection-generator";

describe("buildWordsArray", () => {
  it("should highlight one word", () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 3,
          entity: "hello@world",
        },
      ],
    };
    const words = buildWordsArray(phrase);
    expect(words).toEqual([
      {
        text: "One",
        isHighlighted: true,
      },
      {
        text: "two",
        isHighlighted: false,
      },
      {
        text: "three",
        isHighlighted: false,
      },
      {
        text: "four",
        isHighlighted: false,
      },
      {
        text: "five",
        isHighlighted: false,
      },
    ]);
  });

  it("should highlight two words", () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello@world",
        },
      ],
    };
    const words = buildWordsArray(phrase);
    expect(words).toEqual([
      {
        text: "One",
        isHighlighted: true,
      },
      {
        text: "two",
        isHighlighted: true,
      },
      {
        text: "three",
        isHighlighted: false,
      },
      {
        text: "four",
        isHighlighted: false,
      },
      {
        text: "five",
        isHighlighted: false,
      },
    ]);
  });

  it("should highlight work when 2 entities", () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello",
        },
        {
          startPos: 14,
          endPos: 23,
          entity: "world",
        },
      ],
    };
    const words = buildWordsArray(phrase);
    expect(words).toEqual([
      {
        text: "One",
        isHighlighted: true,
      },
      {
        text: "two",
        isHighlighted: true,
      },
      {
        text: "three",
        isHighlighted: false,
      },
      {
        text: "four",
        isHighlighted: true,
      },
      {
        text: "five",
        isHighlighted: true,
      },
    ]);
  });
});


describe('getWordPositions', () => {


  it('should ignore if no selection', () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello",
        },
        {
          startPos: 14,
          endPos: 23,
          entity: "world",
        },
      ],
    };
    const positions = getWordPositions(phrase);
    expect(positions).toEqual({});
  });

  it('should ignore if no no elements selected', () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello",
        },
        {
          startPos: 14,
          endPos: 23,
          entity: "world",
        },
      ],
    };
    const positions = getWordPositions(phrase, selectionGenerator(undefined, undefined));
    expect(positions).toEqual({});
  });

  it('should ignore if selected text is empty', () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello",
        },
        {
          startPos: 14,
          endPos: 23,
          entity: "world",
        },
      ],
    };
    const positions = getWordPositions(phrase, '');
    expect(positions).toEqual({});
  });

  it('should return the correct positions', () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello",
        },
        {
          startPos: 14,
          endPos: 23,
          entity: "world",
        },
      ],
    };
    const positions = getWordPositions(phrase, selectionGenerator(0, 1));
    expect(positions).toEqual({ "selectedEndPos": 7, "selectedStartPos": 0 });
  });

  it('should return the correct positions when selecting right to left', () => {
    const phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [
        {
          startPos: 0,
          endPos: 7,
          entity: "hello",
        },
        {
          startPos: 14,
          endPos: 23,
          entity: "world",
        },
      ],
    };
    const positions = getWordPositions(phrase, selectionGenerator(1, 0));
    expect(positions).toEqual({ "selectedEndPos": 7, "selectedStartPos": 0 });
  });
});
