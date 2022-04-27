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
    // return (
    //   <span
    //     id={`${phrase.id}-${index}`}
    //     data-count={index}
    //     key={index}
    //     style={{
    //       backgroundColor: word.isHighlighted ? gerRandomColor() : "white",
    //     }}
    //   >
    //     {index === 0 ? word.text : ` ${word.text}`}
    //   </span>
    // );
  });
  return <>{formattedHtml}</>;
};

const gerRandomColor = () => {
  const colors = [
    "rgb(215, 204, 200)",
    "rgb(175, 255, 200)",
    "rgb(159, 236, 254)",
    "rgb(210, 195, 234)",
    "rgb(255, 205, 246)",
    "rgb(255, 209, 175)",
    "rgb(218, 223, 227)",
    "rgb(255, 253, 166)",
    "rgb(255, 209, 175)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
