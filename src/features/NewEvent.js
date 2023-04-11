import React, { useState, useMemo, useEffect } from "react";
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
import dayjs from "dayjs";
import useStore from "../store/DataContext";

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
  const [newEvent, setNewEvent] = useState({});
  const [dateRange, setDateRange] = React.useState([dayjs(), dayjs()]);
  const { events, addEvent } = useStore();

  console.log(events);

  const theme = useTheme();

  useMemo(() => {
    console.log(newEvent);
  }, [newEvent]);

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
    addEvent(newEvent);
    console.log(newEvent);
  };

  const handleChangeForm = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleDivisionChange = (e) => {
    let color;
    console.log(e.target.value);
    switch (e.target.value) {
      case "marketing":
        color = "#F39C12";
        break;
      case "operations":
        color = "#7DCEA0";
        break;
      case "pricing":
        color = "#BB8FCE";
        break;
      case "facilities":
        color = "#AAB7B8 ";
        break;
      default:
        throw new Error("no case select division");
    }
    setNewEvent({ ...newEvent, division: e.target.value, color: color });
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
          label="title"
          variant="outlined"
          value={newEvent?.title ? newEvent.title : ""}
          name="title"
          sx={{ mb: 2 }}
          onChange={handleChangeForm}
        />
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
              onChange={(newValue) => {
                setNewEvent({
                  ...newEvent,
                  start: new Date(
                    newValue[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                  ),
                  end: new Date(newValue[1].format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
                }),
                  setDateRange(newValue);
              }}
              localeText={{ start: "start event", end: "end event" }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {/* //division */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="division">Division</InputLabel>
          <Select
            labelId="division"
            name="division"
            input={<OutlinedInput label="division" />}
            id="demo-simple-select"
            value={newEvent?.division ? newEvent.division : ""}
            onChange={(e) => {
              handleDivisionChange(e);
            }}
            fullWidth
          >
            <MenuItem value={"marketing"} data-color={"E59866"}>
              marketing
            </MenuItem>
            <MenuItem value={"operations"} data-color={"7DCEA0"}>
              operations
            </MenuItem>
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
          name="note"
          value={newEvent?.note ? newEvent.note : ""}
          onChange={handleChangeForm}
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
