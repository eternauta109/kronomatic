import "./styles.css";
import ShareCalendar from "./features/calendar/ShareCalendar";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./features/NavBar";
import WhatShouldIdo from "./features/whatshould/WhatShoIdido";

import { StoreContext } from "./store/DataContext";
import Kanban from "./features/kanban_board/Kanban";

export default function App() {
  const theme = createTheme({
    palette: {},
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreContext>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<ShareCalendar />} />
            <Route path="/whatsholdido" element={<WhatShouldIdo />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </div>
      </StoreContext>
    </ThemeProvider>
  );
}
