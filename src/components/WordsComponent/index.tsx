import React from "react";
import { TrainingPhraseItem, Word } from "../types";
import { WordComponent } from "../WordComponent";

interface WordsComponentProps {
  phrase: TrainingPhraseItem;
  words: Word[];
}

export const WordsComponent = (props: WordsComponentProps) => {
  const { phrase, words } = props;
  const formattedHtml = words.map((word, index) => {
    return (
      <WordComponent
        key={index}
        phraseId={phrase.id}
        index={index}
        word={word}
      />
    );
  });
  return <>{formattedHtml}</>;
};
