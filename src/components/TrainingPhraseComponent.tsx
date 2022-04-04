import React, { useState } from "react";
import { Popover, TableCell, TextField, Typography } from "@mui/material";
import { TrainingPhraseItem, EntityLabel } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import EntitiesSelector from "./EntitiesSelector";

interface TrainingPhraseComponentProps {
  phrase: TrainingPhraseItem;
  deleteTrainingPhrase: (id: string) => void;
  saveTrainingPhrase: (trainingPhrase: TrainingPhraseItem) => void;
}

const isNumberInRange = (number: number, min: number, max: number) => {
  return number >= min && number <= max;
};

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
    console.log(phrase);
    setAnchorEl(event.currentTarget);

    const existingSelection = phrase.entityLables.find((entityLabel) => {
      return (
        entityLabel.startPos === selection.anchorOffset &&
        entityLabel.endPos === selection.focusOffset
      );
    });
    if (existingSelection) {
      setCurrentSelection(existingSelection);
    } else {
      setCurrentSelection({
        entity: "",
        startPos: selection.anchorOffset,
        endPos: selection.focusOffset,
      });
    }
    console.log({
      text,
      startPos: selection.anchorOffset,
      endPos: selection.focusOffset,
    });
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
    // if there is an existing label
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
      //check for overlap
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
        //delete overlap
        phrase.entityLables = phrase.entityLables.filter((label, index) => {
          return index !== overlappingSelection;
        });
      }
      //add new label
      phrase.entityLables = [...phrase.entityLables, selection];
    }
  };
  return (
    <>
      <TableCell>
        {isRedacted ? (
          <TextField fullWidth value={phrase.text} onChange={onPhraseChange} />
        ) : (
          <>
            <div onMouseUp={captureSelection}>
              <Typography>{phrase.text} </Typography>
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
