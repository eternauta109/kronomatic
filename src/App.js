import "./styles.css";
import ShareCalendar from "./features/ShareCalendar";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./features/NavBar";
import WhaShoIdo from "./features/WhaShoIdo";
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
          <NavBar />
          <Routes>
            <Route path="/" element={<ShareCalendar />} />
            <Route path="/whatsholdido" element={<WhaShoIdo />} />
          </Routes>
        </div>
      </StoreContext>
    </ThemeProvider>
  );
}
