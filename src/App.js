import "./styles.css";
import { useMemo } from "react";
import Cinemas from "./features/CinemaList";
import TextField from "@mui/material/TextField";
import NewEvent from "./features/NewEvent";
import MyCalendar from "./features/MyCalendar";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { StoreContext } from "./store/DataContext";

export default function App() {
  const theme = createTheme({
    palette: {},
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreContext>
        <div className="App">
          <div className="megaContainer">
            <Cinemas />
            <div className="calendarContainer">
              <MyCalendar />
            </div>
            <NewEvent />
          </div>
        </div>
      </StoreContext>
    </ThemeProvider>
  );
}
