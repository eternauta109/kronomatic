export const initialState = {
  total: 0,
  events: [
    {
      id: "nota1",
      color: "#7DCEA0",
      description: "distribuire menu mario",
      division: "operations",
      end: new Date(2023, 3, 21), //yyyy,mm,dd
      note: "reato manageriali",
      start: new Date(2023, 3, 10),
      title: "menu mario",
      laneId: "lane1",
    },
    {
      id: "nota2",
      color: "#F39C12",
      description: "volantini",
      division: "marketing",
      end: new Date(2023, 3, 5), //yyyy,mm,dd
      note: "reato manageriali",
      start: new Date(2023, 3, 5),
      title: "montare stand mario bross",
      laneId: "lane1",
    },
    {
      id: "nota3",
      color: "#BB8FCE",
      description: "prezzare film new",
      division: "pricing",
      end: new Date(2023, 3, 15), //yyyy,mm,dd
      note: "",
      start: new Date(2023, 3, 15),
      title: "prezzare film new",
      laneId: "lane1",
    },
    {
      id: "nota4",
      color: "#EF5350",
      description: "compilare file ",
      division: "actionpoint",
      end: new Date(2023, 3, 23, 10, 30), //yyyy,mm,dd
      note: "",
      start: new Date(2023, 3, 23, 15, 0),
      title: "compilare file",
      laneId: "lane1",
    },
    {
      id: "nota5",
      color: "#448AFF",
      description: "programmazione",
      division: "screencontent",
      end: new Date(2023, 3, 28, 17, 30), //yyyy,mm,dd
      note: "",
      start: new Date(2023, 3, 28, 10, 0),
      title: "programmazione",
      laneId: "lane1",
    },
    {
      id: "nota6",
      color: "#90A4AE",
      description: "zerocalcare",
      division: "brief",
      end: new Date(2023, 3, 28, 23, 30), //yyyy,mm,dd
      note: "",
      start: new Date(2023, 3, 28, 14, 0),
      title: "zero calcare",
      laneId: "lane1",
    },
    {
      id: "nota7",
      color: "#F39C12",
      description: "nuova carta",
      division: "marketing",
      start: new Date(2023, 3, 5),
      end: new Date(2023, 3, 25), //yyyy,mm,dd
      note: "reato manageriali",
      title: "loffio",
      laneId: "lane2",
    },
  ],
};

const eventsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_EVENT":
      console.log("ADD_EVENT", payload);
      return { ...state, events: payload.events };
    case "UPDATE_EVENT":
      console.log("UPDATE_EVENT", payload);
      return { ...state, events: payload.events };
    case "GET_EVENTS":
      console.log("GET_EVENTS", payload);
      return { events: payload.events };

    default:
      throw new Error("no case for type", type);
  }
};

export default eventsReducer;
