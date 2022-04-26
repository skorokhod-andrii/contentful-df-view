import React from "react";
import { TrainingPhraseItem, Word } from "../types";

interface WordsComponentProps {
  phrase: TrainingPhraseItem;
  words: Word[];
}

export const WordsComponent = (props: WordsComponentProps) => {
  const { phrase, words } = props;
  const formattedHtml = words.map((word, index) => {
    return (
      <span
        id={`${phrase.id}-${index}`}
        data-count={index}
        key={index}
        style={{ background: word.isHighlighted ? "yellow" : "white" }}
      >
        {index === 0 ? word.text : ` ${word.text}`}
      </span>
    );
  });
  return <>{formattedHtml}</>;
};
