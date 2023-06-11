import React from "react";

import Cinemas from "../CinemaList";

import { Container, Grid } from "@mui/material";
import NewEvent from "../event/NewEvent";
import MyCalendar from "./MyCalendar";

const ShareCalendar = () => {
  return (
    <Container maxWidth="xl" style={{ maxHeight: "900px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <MyCalendar />
        </Grid>
        <Grid item xs={12} md={3}>
          <NewEvent />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShareCalendar;
