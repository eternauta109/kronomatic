import { useState } from "react";
import { Button } from "@mui/material";

import ModalEvent from "../event/ModalEvent";
import Cinemas from "../CinemaList";

import { Container, Grid } from "@mui/material";
import NewEvent from "../event/NewEvent";
import MyCalendar from "./MyCalendar";

const roundButtonStyle = {
  borderRadius: "40%",
  width: "100px",
  height: "60px",
  margin: "20px",
  minWidth: "unset",
  backgroundColor: "green", // Aggiungi il colore rosso al background
};

const ShareCalendar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="xl" style={{ maxHeight: "900px" }}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={11}>
          <MyCalendar handleOpen={handleOpen} />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            variant="contained"
            style={roundButtonStyle}
            onClick={handleOpen}
          >
            Add ITEM
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Grid item xs={12} md={6} sx={{ border: "1px solid black", p: 2 }}>
          qui elemnti imminenti
        </Grid>
        <Grid item xs={12} md={6} sx={{ border: "1px solid black", p: 2 }}>
          qui elemnti imminenti
        </Grid>
      </Grid>
      <ModalEvent event={event} open={open} handleClose={handleClose} />
    </Container>
  );
};

export default ShareCalendar;
