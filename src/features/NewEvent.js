import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { cinemaDB } from "../database/cinemaDB";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import { ButtonBase, FormGroup } from "@mui/material";
import dayjs from "dayjs";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function NewEvent() {
  const [cinemaSelect, setCinemaSelect] = useState([]);
  const [division, setDivision] = useState("");
  const [newEvent, setNewEvent] = useState({});
  const [dateRange, setDateRange] = React.useState([dayjs(), dayjs()]);

  const theme = useTheme();

  console.log(cinemaDB);

  useMemo(() => {
    console.log(dateRange);
  }, [dateRange]);

  const handleChangeCinema = (event) => {
    const {
      target: { value },
    } = event;
    setCinemaSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newEvent);
  };

  const handleChangeForm = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
      daterange: dateRange,
    });
    console.log(e.target.name);
  };

  return (
    <Box
      sx={{
        border: "1px solid green",
        padding: 5,
        mb: 2,
      }}
    >
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Describe event"
          variant="filled"
          multiline
          value={newEvent?.description ? newEvent.description : ""}
          name="description"
          rows={4}
          sx={{ mb: 2 }}
          onChange={handleChangeForm}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              localeText={{ start: "start event", end: "ende event" }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {/* //division */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="division">Division</InputLabel>
          <Select
            labelId="division"
            input={<OutlinedInput label="division" />}
            id="demo-simple-select"
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
            }}
            fullWidth
          >
            <MenuItem value={"marketing"}>marketing</MenuItem>
            <MenuItem value={"operations"}>operations</MenuItem>
            <MenuItem value={"pricing"}>pricing</MenuItem>
            <MenuItem value={"facilities"}>facilities</MenuItem>
          </Select>
        </FormControl>
        {/* cinema coinvolti */}
        <FormControl fullWidth sx={{ mt: 2, maxWidth: 400 }}>
          <InputLabel id="cinemaInvolved">Cinema involved </InputLabel>
          <Select
            multiple
            labelId="cinemaInvolved"
            multiline
            value={cinemaSelect}
            onChange={handleChangeCinema}
            MenuProps={MenuProps}
            input={<OutlinedInput label="Cinema involved" />}
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
        </FormControl>
        <TextField
          fullWidth
          label="some note"
          variant="outlined"
          multiline
          rows={4}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button fullWidth variant="outlined" type="submit" color="secondary">
          Save
        </Button>
      </form>
    </Box>
  );
}

export default NewEvent;
