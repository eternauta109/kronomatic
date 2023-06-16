import Board from "react-trello";
import { useEffect, useState } from "react";
import useStore from "../.././store/DataContext";
import { cinemaDB } from "../.././database/cinemaDB";

const dataInit = {
  lanes: [
    {
      id: "lane1",
      title: "to do task",
      label: "",
      cards: [],
    },
    {
      id: "lane2",
      title: "in progress",
      label: "",
      cards: [],
    },
    {
      id: "lane3",
      title: "Completed",
      label: "",
      cards: [],
    },
    {
      id: "lane4",
      title: "Blocked",
      label: "",
      cards: [],
    },
  ],
};

const Kanban = () => {
  const [data, setData] = useState(dataInit);
  const { events, upDateEvent } = useStore();

  const managers = cinemaDB[0].managers;
  console.log("managers", managers);

  useEffect(() => {
    // Aggiorna gli eventi nella prima corsia (lane1)
    const updatedData = {
      lanes: data.lanes.map((lane) => ({
        ...lane,
        cards: events.filter((event) => event.laneId === lane.id),
      })),
    };

    setData(updatedData);

    // Aggiorna il valore di data
    setData(updatedData);
  }, [events]);

  const onCardClicked = (e, d) => {
    console.log(e, d);
    const finder = events.find((event) => event.id === e);
    console.log("finder", finder);
  };

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log("drag ended");
    console.log(`cardId: ${cardId}`);
    console.log(`sourceLaneId: ${sourceLaneId}`);
    console.log(`targetLaneId: ${targetLaneId}`);
    const finder = events.find((event) => event.id === cardId);
    const newEvent = { ...finder, laneId: targetLaneId };
    upDateEvent(newEvent, cardId);
  };

  console.log(events);
  return (
    <div>
      mario
      <Board
        style={{ height: "500px" }}
        data={data}
        onCardClick={onCardClicked}
        handleDragEnd={handleDragEnd}
        laneStyle={{
          maxHeight: "450px",
          overflowY: "auto", // Opzionale: aggiunge una barra di scorrimento quando il contenuto supera l'altezza massima
        }}
      />
      antonio
      <Board
        style={{ height: "500px" }}
        data={data}
        onCardClick={onCardClicked}
        handleDragEnd={handleDragEnd}
        laneStyle={{
          maxHeight: "450px",
          overflowY: "auto", // Opzionale: aggiunge una barra di scorrimento quando il contenuto supera l'altezza massima
        }}
      />
      paolo
      <Board
        style={{ height: "500px" }}
        data={data}
        onCardClick={onCardClicked}
        handleDragEnd={handleDragEnd}
        laneStyle={{
          maxHeight: "450px",
          overflowY: "auto", // Opzionale: aggiunge una barra di scorrimento quando il contenuto supera l'altezza massima
        }}
      />
    </div>
  );
};

export default Kanban;
