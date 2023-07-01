import React, { useState, useMemo, useEffect } from "react";

import {
  Box,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  OutlinedInput,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import { useTheme } from "@mui/material/styles";
import { cinemaDB } from "../../database/cinemaDB";
import dayjs from "dayjs";
import useStore from "../../store/DataContext";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getStylesManager(name, personName, theme) {
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

function NewEvent({ handleClose }) {
  const [cinemaSelect, setCinemaSelect] = useState([]);
  const [manager, setManager] = useState([]);

  const [upDate, setUpDate] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const {
    events,
    addEvent,
    upDateEvent,
    event,
    addTitleInEvent,
    addDescriptionInEvent,
  } = useStore();
  const managers = cinemaDB[0].managers;

  console.log("events", events);
  console.log("event", event);
  const theme = useTheme();

  /*   useMemo(() => {
    console.log(newEvent);
  }, [newEvent]); */

  const handleChangeCinema = (event) => {
    const {
      target: { value },
    } = event;
    setCinemaSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeManager = (event) => {
    const {
      target: { value },
    } = event;
    setManager(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const onSubmit = () => {
    console.log("quiiii");
    event.preventDefault();
    if (upDate) {
      upDateEvent(event, event.id);
      handleClose();
    } else {
      const eventBis = {
        ...event,
        laneId: "lane1",
        id: `nota${events.length + 1}`,
      };
      console.log("newevent", event);
      addEvent(eventBis);
    }
  };



  /* const handleDivisionChange = (e) => {
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
        color = "#AAB7B8";
        break;
      case "screencontent":
        color = "#448AFF";
        break;
      case "actionpoint":
        color = "#EF5350";
        break;
      case "brief":
        color = "#90A4AE";
        break;
      default:
        throw new Error("no case select division");
    }
    setNewEvent({ ...event, division: e.target.value, color: color });
  }; */

  useEffect(() => {
    if (event) {
      setUpDate(true);
    }

    return () => {};
  }, []);

  return (
    <Container
      sx={{
        height: "100%",
        padding: 2,
        mb: 2,
      }}
    >
      {upDate && (
        <Button variant="contained" sx={{ m: 2 }}>
          Done
        </Button>
      )}
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="title"
          variant="outlined"
          value={event?.title ? event.title : ""}
          name="title"
          sx={{ mb: 2 }}
          onChange={(e) => addTitleInEvent(e.target.value)}
        />
        <TextField
          fullWidth
          label="Describe event"
          variant="filled"
          multiline
          value={event?.description ? event.description : ""}
          name="description"
          rows={4}
          sx={{ mb: 2 }}
          onChange={(e) => addDescriptionInEvent(e.target.value)}
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
        {/*  
       

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
            <MenuItem value={"screencontent"}>screen conten</MenuItem>
            <MenuItem value={"actionpoint"}>action point</MenuItem>
            <MenuItem value={"brief"}>new brief</MenuItem>
          </Select>
        </FormControl>

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
        <FormControl fullWidth sx={{ mt: 2, maxWidth: 400 }}>
          <InputLabel id="owner">person in charge</InputLabel>
          <Select
            multiple
            labelId="owner"
            value={manager}
            onChange={handleChangeManager}
            MenuProps={MenuProps}
            input={<OutlinedInput label="person in charge" />}
          >
            {managers.map((el, key) => (
              <MenuItem
                key={key}
                value={el}
                style={getStylesManager(el, manager, theme)}
              >
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="link egnyte"
          variant="outlined"
          size="small"
          name="egnyte"
          value={newEvent?.egenyte ? newEvent.egnyte : ""}
          onChange={handleChangeForm}
          rows={1}
          sx={{ mt: 2, mb: 2 }}
        />
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
         */}
        <Button fullWidth variant="outlined" type="submit" color="secondary">
          {upDate ? "updates" : "save"}
        </Button>
      </form>
    </Container>
  );
}

export default NewEvent;
