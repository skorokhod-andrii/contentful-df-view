import FormControl from "@mui/material/FormControl";
import React, { useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { EntityLabel } from "./types";
import { getEntitiesList } from "./api";
import { TextField } from "@mui/material";

interface EntitiesSelectorProps {
  entityLabel: EntityLabel | null;
  onEntityNameChange: (selection: EntityLabel) => void;
}

const EntitiesSelector = (props: EntitiesSelectorProps) => {
  const { onEntityNameChange, entityLabel } = props;
  const [selectedEntity, selectEntity] = React.useState<string>(
    entityLabel?.entity
      ? `${entityLabel.entity}${entityLabel.role ? `@${entityLabel.role}` : ""}`
      : ""
  );
  const [selectedGroup, updateGroup] = React.useState<string>(
    entityLabel?.group || ""
  );
  const [entityNames, setEntityNames] = React.useState<string[]>([]);
  useEffect(() => {
    getEntitiesList().then((ent) => {
      console.log(ent);
      setEntityNames(ent);
    });
  }, [entityLabel]);
  if (entityLabel === null) {
    return <div>BUGGGG</div>;
  }
  const handleEntityNameChange = (event: any): void => {
    selectEntity(event.target.value);
    const [entity, role] = event.target.value.split("@");
    onEntityNameChange({
      ...entityLabel,
      ...{ entity, role, group: selectedGroup },
    });
  };
  const handleGroupChange = (event: any): void => {
    updateGroup(event.target.value);
    const [entity, role] = selectedEntity.split("@");
    onEntityNameChange({
      ...entityLabel,
      ...{ entity, role, group: event.target.value },
    });
  };
  return (
    <div>
      <TextField
        fullWidth
        value={selectedGroup}
        onChange={handleGroupChange}
        placeholder={"Group"}
      />
      <FormControl sx={{ m: 1, minWidth: 150, minHeight: 150 }}>
        <Select
          labelId="entity-name-selector"
          id="entity-name-selector"
          value={selectedEntity}
          onChange={handleEntityNameChange}
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
    </div>
  );
};

export default EntitiesSelector;
