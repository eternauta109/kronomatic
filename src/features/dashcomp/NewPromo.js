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
  TextField,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { cinemaDB } from "../../database/cinemaDB";

import usePromoStore from "../../store/PromoDataContext";

function NewPromo({ handleClosePromo }) {
  /*  const [cinemaSelect, setCinemaSelect] = useState([]); */

  const [upDate, setUpDate] = useState(false);

  const { promo } = useDataStore();


 
  const theme = useTheme();

  
  const onSubmit = (e) => {
    e.preventDefault();
    if (upDate) {
      upDateEvent(event, event.id);
      handleClose();
    } else {
      const eventBis = {
        ...event,
        laneId: `lane-${event.manager ? event.manager : managers[0]}`,
        manager: event.manager ? event.manager : managers[0],
        id: `nota${events.length + 1}`,
      };
      console.log("newevent", event);
      addEvent(eventBis);
    }
    initEvent();
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
    setDivision({ division: e.target.value, color: color });
  };

  useEffect(() => {
    console.log("UPDATE", upDate);
    if (event.id !== null) {
      console.log("evento.id nullo");
      setUpDate(true);
    }

    return () => {
      initEvent();
    };
  }, []);

  return (
    <Container
      sx={{
        height: "700px",
        padding: 2,

        mb: 2,
        overflowY: "auto",
      }}
    >
      {upDate && (
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={(e) => {
            handleClose();
            initEvent();
          }}
        >
          exit without save
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

        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            console.log(
              "datetime",
              item.selection.startDate,
              item.selection.endDate
            );
            setDate(item.selection);
            setDateState([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateState}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="division">Division</InputLabel>
          <Select
            labelId="division"
            name="division"
            input={<OutlinedInput label="division" />}
            id="demo-simple-select"
            value={event?.division ? event.division : ""}
            onChange={(e) => {
              handleDivisionChange(e);
            }}
            fullWidth
          >
            <MenuItem value={"marketing"}>marketing</MenuItem>
            <MenuItem value={"operations"}>operations</MenuItem>
            <MenuItem value={"pricing"}>pricing</MenuItem>
            <MenuItem value={"facilities"}>facilities</MenuItem>
            <MenuItem value={"screencontent"}>screen conten</MenuItem>
            <MenuItem value={"actionpoint"}>action point</MenuItem>
            <MenuItem value={"brief"}>new brief</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="link egnyte"
          variant="outlined"
          size="small"
          name="egnyte"
          value={event?.link ? event.link : ""}
          onChange={(link) => addLink(link.target.value)}
          rows={1}
          sx={{ mt: 2, mb: 2 }}
        />
        <TextField
          fullWidth
          label="some note"
          variant="outlined"
          multiline
          name="note"
          value={event?.note ? event.note : ""}
          onChange={(note) => addNote(note.target.value)}
          rows={4}
          sx={{ mt: 2, mb: 2 }}
        />

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="owner">person in charge</InputLabel>
          <Select
            fullWidth
            labelId="owner"
            value={event?.manager ? event.manager : managers[0]}
            onChange={(e) => setManager(e.target.value)}
            MenuProps={MenuProps}
            input={<OutlinedInput label="person in charge" />}
          >
            {managers.map((el, key) => (
              <MenuItem key={key} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/*  
       

        

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
        
        
         */}
        <Button fullWidth variant="outlined" type="submit" color="secondary">
          {upDate ? "updates" : "save"}
        </Button>
      </form>
    </Container>
  );
}

export default NewEvent;
