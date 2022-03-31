import { createSlice } from "@reduxjs/toolkit";
import { EntityLabel, TrainingPhraseItem } from "../types";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    entityNames: ["foo", "bar", "baz"],
    trainingPhrases: [] as TrainingPhraseItem[], // MAYBE JUST TAKE FROM PROPS
    selectedEntityLabel: null as EntityLabel | null,
    selectedTrainingPhraseId: null as string | null,
  },
  reducers: {
    addTrainingPhrase: (state, action) => {
      state.trainingPhrases.push(action.payload);
    },
    removeTrainingPhrase: (state, action) => {
      state.trainingPhrases = state.trainingPhrases.filter(
        (phrase) => phrase.id !== action.payload
      );
    },
    selectText: (state, action) => {
      //TODO when should I calculate startPos and endPos? TODO THINK ABOUT THIS LOGIC
      if (action.payload.selectedText) {
        state.selectedEntityLabel = action.payload.selectedText;// Maybe calculate here?
        state.selectedTrainingPhraseId = action.payload.selectedTrainingPhrase;
      } else {
        state.selectedEntityLabel = null;
        state.selectedTrainingPhraseId = null;
      }
    },
    updateEntityLabel: (state, action) => {
      if (state.selectedEntityLabel) {
        state.selectedEntityLabel.entity = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTrainingPhrase, removeTrainingPhrase, selectText } =
  mainSlice.actions;

export default mainSlice.reducer;
