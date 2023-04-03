import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { cinemaDB } from "../database/cinemaDB";
import OutlinedInput from "@mui/material/OutlinedInput";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function NewEvent() {
  const [division, setDivision] = useState("");
  const theme = useTheme();
  const [cinemaSelect, setCinemaSelect] = useState([]);
  console.log(cinemaDB);

  const handleChangeCinema = (event) => {
    const {
      target: { value }
    } = event;
    setCinemaSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box
      sx={{
        border: "1px solid green",
        padding: 5,
        mb: 2
      }}
    >
      <TextField
        fullWidth
        label="Describe event"
        variant="filled"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker"]}>
          <DateRangePicker
            localeText={{ start: "start event", end: "ende event" }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <InputLabel sx={{ mt: 2 }}>Division</InputLabel>
      <Select
        label="division"
        value={division}
        onChange={(e) => {
          setDivision(e.target.value);
        }}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value={"marketing"}>marketing</MenuItem>
        <MenuItem value={"operations"}>operations</MenuItem>
        <MenuItem value={"pricing"}>pricing</MenuItem>
        <MenuItem value={"facilities"}>facilities</MenuItem>
      </Select>
      <InputLabel id="demo-multiple-name-label">Cinema involved </InputLabel>
      <Select
        multiple
        fullWidth
        value={cinemaSelect}
        onChange={handleChangeCinema}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
      >
        {cinemaDB.map((el, key) => (
          <MenuItem
            key={key}
            value={el.name}
            style={getStyles(el.name, cinemaSelect, theme)}
          >
            {el.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        label="some note"
        variant="outlined"
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}

export default NewEvent;
