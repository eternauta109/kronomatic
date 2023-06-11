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
  const { events } = useStore();

  useEffect(() => {
    // Aggiorna gli eventi nella prima corsia (lane1)
    const updatedData = {
      ...data,
      lanes: [
        {
          ...data.lanes[0],
          cards: events, // Aggiungi gli eventi alla prima corsia
        },
        ...data.lanes.slice(1), // Mantieni le altre corsie invariate
      ],
    };

    // Aggiorna il valore di data
    setData(updatedData);
  }, [events]);

  console.log(events);
  return <Board data={data} />;
};

export default Kanban;
