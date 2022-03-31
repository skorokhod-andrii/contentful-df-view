import React, { useState } from "react";
import { TableCell, TextField, Typography } from "@mui/material";
import { TrainingPhraseItem } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

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
    console.log({
      text,
      startPos: selection.anchorOffset,
      endPos: selection.focusOffset,
    });
  };
  return (
    <>
      <TableCell>
        {isRedacted ? (
          <TextField fullWidth value={phrase.text} onChange={onPhraseChange} />
        ) : (
          <div onMouseUp={captureSelection}>
            <Typography>{phrase.text} </Typography>
          </div>
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
