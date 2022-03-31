import React, { useEffect, useState } from "react";
import { PlainClientAPI } from "contentful-management";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { v4 as uuid } from "uuid";
import Popover from "@mui/material/Popover";
import { FieldProps, TrainingPhraseItem } from "./types";
import { Table, TableBody, TableRow, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { TrainingPhraseComponent } from "./TrainingPhraseComponent";

function createTrainingPhrase(text: string): TrainingPhraseItem {
  return {
    id: uuid(),
    text,
    entityLables: [],
  };
}
const Field = (props: FieldProps) => {
  const [trainingPhrases, setTrainingPhrases] = useState<TrainingPhraseItem[]>(
    []
  );
  const [newTrainingPhraseText, setNewTrainingPhraseText] = useState("");
  useEffect(() => {
    // This ensures our app has enough space to render
    props.sdk.window.startAutoResizer();

    // Every time we change the value on the field, we update internal state
    props.sdk.field.onValueChanged((value: TrainingPhraseItem[]) => {
      if (Array.isArray(value)) {
        setTrainingPhrases(value);
      }
    });
  });

  /** Deletes an item from the list */
  const deletePhraseById = (id: string) => {
    props.sdk.field.setValue(trainingPhrases.filter((i) => i.id !== id));
  };
  const saveTrainingPhrase = (trainingPhrase: TrainingPhraseItem) => {
    const trainingPhraseIndex = trainingPhrases.findIndex(
      (phrase) => phrase.id === trainingPhrase.id
    );
    if (trainingPhraseIndex !== -1) {
      trainingPhrases[trainingPhraseIndex] = trainingPhrase;
    } else {
      trainingPhrases.push(trainingPhrase);
    }
    props.sdk.field.setValue(trainingPhrases);
  };
  const addNewTrainingPhrase = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && newTrainingPhraseText.trim().length > 0) {
      props.sdk.field.setValue([
        ...trainingPhrases,
        createTrainingPhrase(newTrainingPhraseText),
      ]);
      setNewTrainingPhraseText("");
    }
  };
  const handleNewTrainingPhraseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTrainingPhraseText(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          fullWidth
          value={newTrainingPhraseText}
          onKeyUp={addNewTrainingPhrase}
          onChange={handleNewTrainingPhraseChange}
          placeholder="Add new training phrase"
        />
      </div>
      <Table>
        <TableBody>
          {trainingPhrases.map((phrase: TrainingPhraseItem) => (
            <TableRow key={phrase.id}>
              <TrainingPhraseComponent
                phrase={phrase}
                deleteTrainingPhrase={deletePhraseById}
                saveTrainingPhrase={saveTrainingPhrase}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Field;
