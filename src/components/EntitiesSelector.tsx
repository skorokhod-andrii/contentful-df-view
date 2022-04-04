import FormControl from "@mui/material/FormControl";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { EntityLabel } from "./types";

interface EntitiesSelectorProps {
  entityLabel: EntityLabel | null;
  onEntityNameChange: (selection: EntityLabel) => void;
}
const entityNames = ["foo", "bar", "baz"];

const EntitiesSelector = (props: EntitiesSelectorProps) => {
  const { onEntityNameChange, entityLabel } = props;
  const [entityName, setEntityName] = React.useState(entityLabel?.entity || "");
  if (entityLabel === null) {
    return <div>BUGGGG</div>;
  }
  const handleChange = (event: any): void => {
    console.log(event);
    setEntityName(event.target.value);
    onEntityNameChange({ ...entityLabel, entity: event.target.value });
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 150, minHeight: 150 }}>
      <Select
        labelId="entity-name-selector"
        id="entity-name-selector"
        value={entityName}
        onChange={handleChange}
      >
        <MenuItem value="" key="None">
          <em>None</em>
        </MenuItem>
        {entityNames.map((entityName) => (
          <MenuItem key={entityName} value={entityName}>
            {entityName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EntitiesSelector;
