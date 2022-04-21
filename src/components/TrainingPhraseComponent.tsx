import React, { useState } from "react";
import { Popover, TableCell, TextField, Typography } from "@mui/material";
import { TrainingPhraseItem, EntityLabel } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import EntitiesSelector from "./EntitiesSelector";
import { buildWordsArray, isNumberInRange } from "./utils";
import { WordsComponent } from "./WordsComponent";

interface TrainingPhraseComponentProps {
  phrase: TrainingPhraseItem;
  deleteTrainingPhrase: (id: string) => void;
  saveTrainingPhrase: (trainingPhrase: TrainingPhraseItem) => void;
}

export const TrainingPhraseComponent = (
  props: TrainingPhraseComponentProps
) => {
  const {
    phrase: initalPhrase,
    deleteTrainingPhrase,
    saveTrainingPhrase,
  } = props;
  const [phrase, setPhrase] = useState<TrainingPhraseItem>(initalPhrase);
  const [isRedacted, setIsRedacted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSelection, setCurrentSelection] = useState<EntityLabel | null>(
    null
  );

  const redactPhrase = () => {
    setIsRedacted(true);
  };
  const onPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhrase = { ...phrase, text: event.target.value };
    setPhrase(newPhrase);
  };

  const savePhrase = () => {
    setIsRedacted(false);
    phrase.entityLables.sort((a, b) => a.startPos - b.startPos);
    saveTrainingPhrase(phrase);
  };

  const deletePhrase = () => {
    deleteTrainingPhrase(phrase.id);
  };

  const captureSelection = (event: any) => {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    const text = selection.toString();
    if (!text) {
      return;
    }
    const anchorNum = selection.anchorNode?.parentElement?.dataset.count;
    const focusNum = selection.focusNode?.parentElement?.dataset.count;
    if (anchorNum === undefined || focusNum === undefined) {
      console.log("no word index");
      return;
    }
    const firstWordIndex = anchorNum < focusNum ? anchorNum : focusNum;
    const secondWordIndex = anchorNum < focusNum ? focusNum : anchorNum;
    const splittedWords = phrase.text.split(" ");
    const selectedStartPos = splittedWords
      .slice(0, Number(firstWordIndex))
      .join(" ").length;
    const selectedEndPos = splittedWords
      .slice(0, Number(secondWordIndex) + 1)
      .join(" ").length;

    setAnchorEl(event.currentTarget);

    const existingSelection = phrase.entityLables.find((entityLabel) => {
      return (
        entityLabel.startPos === selectedStartPos &&
        entityLabel.endPos === selectedEndPos
      );
    });
    if (existingSelection) {
      setCurrentSelection(existingSelection);
    } else {
      setCurrentSelection({
        entity: "",
        startPos: selectedStartPos,
        endPos: selectedEndPos,
      });
    }
  };
  const closePopover = () => {
    setAnchorEl(null);
    savePhrase();
  };

  const onEntityNameChange = (selection: EntityLabel) => {
    // find is there an existing label in the phrase with those startPos or end pos. Or is there an overlapping in that range
    //if there is an existing label, and user clears it, we remove it
    if (!selection.entity) {
      phrase.entityLables = phrase.entityLables.filter((entityLabel) => {
        return (
          entityLabel.startPos !== selection.startPos &&
          entityLabel.endPos !== selection.endPos
        );
      });
      return;
    }
    const existingSelectionIndex = phrase.entityLables.findIndex(
      (entityLabel) => {
        return (
          entityLabel.startPos === selection.startPos &&
          entityLabel.endPos === selection.endPos
        );
      }
    );
    if (existingSelectionIndex !== -1) {
      phrase.entityLables[existingSelectionIndex] = selection;
    } else {
      const overlappingSelection = phrase.entityLables.findIndex(
        (entityLabel) => {
          return (
            isNumberInRange(
              selection.startPos,
              entityLabel.startPos,
              entityLabel.endPos
            ) ||
            isNumberInRange(
              selection.endPos,
              entityLabel.startPos,
              entityLabel.endPos
            )
          );
        }
      );
      if (overlappingSelection !== -1) {
        phrase.entityLables = phrase.entityLables.filter((label, index) => {
          return index !== overlappingSelection;
        });
      }
      phrase.entityLables = [...phrase.entityLables, selection];
    }
  };
  const words = buildWordsArray(phrase);
  return (
    <>
      <TableCell>
        {isRedacted ? (
          <TextField fullWidth value={phrase.text} onChange={onPhraseChange} />
        ) : (
          <>
            <div onMouseUp={captureSelection}>
              <Typography>
                <WordsComponent phrase={phrase} words={words} />
              </Typography>
            </div>
            <Popover
              open={anchorEl !== null}
              anchorEl={anchorEl}
              onClose={closePopover}
            >
              <EntitiesSelector
                onEntityNameChange={onEntityNameChange}
                entityLabel={currentSelection}
              ></EntitiesSelector>
            </Popover>
          </>
        )}
      </TableCell>
      <TableCell size="small" align="right">
        {isRedacted ? (
          <SaveIcon onClick={savePhrase} cursor="pointer" />
        ) : (
          <EditIcon onClick={redactPhrase} cursor="pointer"></EditIcon>
        )}
        <DeleteIcon onClick={deletePhrase} cursor="pointer" />
      </TableCell>
    </>
  );
};
