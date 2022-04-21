import { TrainingPhraseItem, Word } from "./types";
import { v4 as uuid } from "uuid";

const ENTER_KEY = "Enter";

export const isEnter = (event: KeyboardEvent): boolean => {
  return event.key === ENTER_KEY && !event.shiftKey;
};
export const isNumberInRange = (number: number, min: number, max: number) => {
  return number >= min && number <= max;
};

export const buildWordsArray = (phrase: TrainingPhraseItem): Word[] => {
  try {
    const phrases = [];
    for (let i = 0; i < phrase.entityLables.length; i++) {
      const previousStart = phrase.entityLables[i - 1]?.endPos || 0;
      const previousEnd = phrase.entityLables[i].startPos;
      const previousText = phrase.text.substring(previousStart, previousEnd);
      previousText.length &&
        phrases.push({
          text: previousText,
          isHighlighted: false,
        });
      const thisStart = phrase.entityLables[i].startPos;
      const thisEnd = phrase.entityLables[i].endPos;
      const textToPush = phrase.text.substring(thisStart, thisEnd);
      textToPush.length &&
        phrases.push({
          text: textToPush,
          isHighlighted: true,
        });
    }
    const lastEnd =
      phrase.entityLables[phrase.entityLables.length - 1]?.endPos || 0;
    const lastText = phrase.text.substring(lastEnd);
    lastText.length &&
      phrases.push({
        text: lastText,
        isHighlighted: false,
      });
    return phrases.reduce(
      (acc: { text: string; isHighlighted: boolean }[], phrase) => {
        const words = phrase.text
          .split(" ")
          .filter(Boolean)
          .map((word, index) => {
            return {
              text: word,
              isHighlighted: phrase.isHighlighted,
            };
          });
        return [...acc, ...words];
      },
      []
    );
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const createTrainingPhrase = (text: string): TrainingPhraseItem => {
  return {
    id: uuid(),
    text,
    entityLables: [],
  };
};
