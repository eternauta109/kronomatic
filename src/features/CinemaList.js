import { useState, useMemo } from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  List,
  Button,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import MovieCreationIcon from "@mui/icons-material/MovieCreation";

import { cinemaDB } from "../database/cinemaDB";

function Cinemas() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleListItemClick = (event, index, name) => {
    // controllo se esiste un oggetto con lo stesso indice e nome nell'array
    const currentIndex = selectedItems.findIndex(
      (item) => item.index === index && item.name === name
    );
    // creo una copia dell'array
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      // se l'oggetto non esiste, lo creo e lo aggiungo all'array
      const newItem = { index, name }; // creo un oggetto con le proprietà index e name
      newSelectedItems.push(newItem);
    } else {
      // se l'oggetto esiste, lo rimuovo dall'array
      newSelectedItems.splice(currentIndex, 1);
    }

    // aggiorno lo stato con il nuovo array
    setSelectedItems(newSelectedItems);
  };

  const handleButtonClick = () => {
    // controllo se tutti gli item sono già selezionati
    const allSelected = cinemaDB.length === selectedItems.length;
    // se sono tutti selezionati, svuoto l'array della selezione
    if (allSelected) {
      setSelectedItems([]);
    } else {
      // altrimenti, riempio l'array con tutti gli oggetti corrispondenti agli item
      const newSelectedItems = cinemaDB.map((item, index) => ({
        index,
        name: item.name,
      }));
      setSelectedItems(newSelectedItems);
    }
  };

  useMemo(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <div className="cinemaContainer">
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: "5px" }}
        onClick={handleButtonClick} // passo la funzione al click del button
      >
        {/* cambio il testo del button in base allo stato della selezione */}
        {cinemaDB.length === selectedItems.length
          ? "Deselect All"
          : "Select All"}
      </Button>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {cinemaDB.map((el, index) => (
          <ListItemButton
            sx={{
              px: 3,
              pt: 2.5,
              border: "1px solid grey",
              m: 1,

              borderRadius: "16px",
              "&.Mui-selected": {
                // aggiunto questa proprietà per forzare il colore di sfondo
                bgcolor: selectedItems.some(
                  (selectedItem) =>
                    selectedItem.index === index &&
                    selectedItem.name === el.name
                ) // uso il metodo some per controllare se esiste un oggetto con lo stesso indice e nome nell'array
                  ? "green"
                  : "black",
                color: "white",
              },
              "&:hover": {
                bgcolor: "#7364f7",
                color: "white",
                border: "1px solid green",
              },
            }}
            selected={selectedItems.some(
              (selectedItem) =>
                selectedItem.index === index && selectedItem.name === el.name
            )}
            onClick={(event) => handleListItemClick(event, index, el.name)}
            key={index}
          >
            <ListItemAvatar>
              <Avatar>
                <MovieCreationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={el.name}
              secondary={`scr:${el.screens}, seats:${el.seats}`}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export default Cinemas;
