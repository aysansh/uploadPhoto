import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import i18n from "../../i18n";

function SelectBox() {
  const [lang, setLang] = React.useState("en");

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={i18n.language}
        onChange={handleChange}
    
      >
        <MenuItem value={"en"}>english</MenuItem>
        <MenuItem value={"fa"}>farsi</MenuItem>
      </Select>
    </FormControl>
  );
}
export default SelectBox;
