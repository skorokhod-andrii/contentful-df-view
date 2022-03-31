import React, { useEffect, useState } from "react";
import { PlainClientAPI } from "contentful-management";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  EditorToolbarButton,
  Button,
} from "@contentful/forma-36-react-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { v4 as uuid } from "uuid";
import { TextInput } from "@contentful/f36-components";
import Popover from "@mui/material/Popover";
interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

interface TrainingPhraseItem {
  id: string;
  text: string;
  entityLables: EntityLabel[];
}

interface EntityLabel {
  entity: string;
  startPos: number;
  endPos: number;
}

function createTrainingPhrase(): TrainingPhraseItem {
  return {
    id: uuid(),
    text: "",
    entityLables: [],
  };
}
const Field = (props: FieldProps) => {
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/

  const [items, setItems] = useState<TrainingPhraseItem[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);

  const handleClick = (item: TrainingPhraseItem) => (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(window.getSelection());
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    // This ensures our app has enough space to render
    props.sdk.window.startAutoResizer();

    // Every time we change the value on the field, we update internal state
    props.sdk.field.onValueChanged((value: TrainingPhraseItem[]) => {
      if (Array.isArray(value)) {
        setItems(value);
      }
    });
  });

  /** Adds another item to the list */
  const addNewItem = () => {
    props.sdk.field.setValue([...items, createTrainingPhrase()]);
  };

  const onTrainingPhraseChange =
    (item: TrainingPhraseItem) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedItem = items.find((i) => i.id === item.id);
      if (selectedItem) {
        selectedItem.text = event.target.value;
      }
      props.sdk.field.setValue(items);
    };

  /** Deletes an item from the list */
  const deleteItem = (item: TrainingPhraseItem) => {
    props.sdk.field.setValue(items.filter((i) => i.id !== item.id));
  };

  return (
    <div>
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <TextInput
                  id="text"
                  name="text"
                  width="full"
                  value={item.text}
                  onChange={onTrainingPhraseChange(item)}
                  onMouseUpCapture={handleClick(item)}
                />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >

                </Popover>
              </TableCell>
              <TableCell align="right">
                <EditorToolbarButton
                  label="delete"
                  icon="Delete"
                  onClick={() => deleteItem(item)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        buttonType="naked"
        onClick={addNewItem}
        icon="PlusCircle"
        style={{ marginTop: "5px" }}
      >
        Add user expression
      </Button>
    </div>
  );
};

export default Field;
