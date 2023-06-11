import Board from "react-trello";
import { useEffect, useState } from "react";
import useStore from "../.././store/DataContext";

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
      matio
      <Board
        data={data}
        onCardClick={onCardClicked}
        handleDragEnd={handleDragEnd}
      />
      livio
      <Board data={data} />
    </div>
  );
};

export default Kanban;
