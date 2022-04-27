

export const selectionGenerator = (firstCount, secondCount) => {
  const mockedSelection = {
    anchorNode: {
      parentElement: {
        dataset: {
          count: firstCount,
        }
      }
    },
    focusNode: {
      parentElement: {
        dataset: {
          count: secondCount,
        }
      }
    }
  };
  return mockedSelection;
}
