// import React, { useEffect, useState } from "react";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from "./store";

// type EntitiesPopoverProps = {
//   entityName?: string;
//   setEntityName: (entityName: string) => void;
// };


// export const EntityNameSelector = () => {
//   const dispatch = useDispatch();
//   const entities = useSelector((state: RootState) => state.main.entityNames);
//   const selectedTrainingPhrase = useSelector((state: RootState) => state.main.selectedTrainingPhrase);
//   // const { entityName, setEntityName } = props;
//   // const handleChange = (event: SelectChangeEvent) => {
//   //   setEntityName(event.target.value);
//   // };
//   return (
//     <div>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <Select
//           value={entityName}
//           onChange={handleChange}
//           displayEmpty
//           inputProps={{ "aria-label": "Without label" }}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           {entities.map((entity) => (
//             <MenuItem value={entity}>{entity}</MenuItem>
//           ))}
//         </Select>
//         <FormHelperText>Without label</FormHelperText>
//       </FormControl>
//     </div>
//   );
// };
export {}
