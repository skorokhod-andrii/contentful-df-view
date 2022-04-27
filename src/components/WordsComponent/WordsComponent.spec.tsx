import React from "react";
import { render } from "@testing-library/react";
import { WordsComponent } from "../WordsComponent";
import { EntityLabel, TrainingPhraseItem, Word } from "../types";

describe("Words component", () => {
  let phrase: TrainingPhraseItem;
  let words: Word[];
  beforeEach(() => {
    phrase = {
      id: "1",
      text: "One two three four five",
      entityLables: [] as EntityLabel[],
    } as TrainingPhraseItem;
    words = [
      { text: "One", isHighlighted: false },
      { text: "two", isHighlighted: false },
      { text: "three", isHighlighted: false },
      { text: "four", isHighlighted: false },
      { text: "five", isHighlighted: false },
    ] as Word[];
  });
  afterEach(() => {});

  it("Component text exists", () => {
    const component = render(<WordsComponent phrase={phrase} words={words} />);
    // component.
    // const { getByText } = render(<Field cma={mockCma} sdk={mockSdk} />);
    // expect(getByText("Hello Entry Field Component")).toBeInTheDocument();
  });
});
