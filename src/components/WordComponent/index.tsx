import { memo, useState } from "react";
import { Word } from "../types";

interface WordComponentProps {
  phraseId: string;
  index: number;
  word: Word;
}

export const WordComponent = (props: WordComponentProps) => {
  const [randomColor] = useState(gerRandomColor());
  const { phraseId, index, word } = props;
  return (
    <span
      id={`${phraseId}-${index}`}
      data-count={index}
      style={{
        backgroundColor: word.isHighlighted ? randomColor : "white",
      }}
    >
      {index === 0 ? word.text : ` ${word.text}`}
    </span>
  );
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
