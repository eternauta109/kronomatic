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

function NewPromo({ handleClosePromo }) {
  /*  const [cinemaSelect, setCinemaSelect] = useState([]); */

  const [upDate, setUpDate] = useState(false);

  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    if (upDate) {
    } else {
      const promoBis = {
        ...promo,
      };
      console.log("newevent", event);
      addEvent(eventBis);
    }
    initEvent();
  };

  useEffect(() => {}, []);

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
          name="title"
          sx={{ mb: 2 }}
        />

        {/*  <FormControl fullWidth sx={{ mt: 2 }}>
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
        </FormControl> */}

        <Button fullWidth variant="outlined" type="submit" color="secondary">
          {upDate ? "updates" : "save"}
        </Button>
      </form>
    </Container>
  );
}

export default NewPromo;
