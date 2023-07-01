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
      responsible: null,
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
      responsible: null,
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
      responsible: null,
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
      responsible: null,
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
      responsible: null,
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
      responsible: null,
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
      responsible: null,
      laneId: "lane2",
    },
  ],
  newEvent: {
    id: null,
    color: null,
    description: "",
    division: null,
    startDate: new Date(),
    endDate: new Date(),
    note: "",
    title: "",
    responsible: "",
    laneId: "lane1",
  },
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
      return { ...state, events: payload.events };
    case "INSERT_TITLE":
      console.log("insert title", payload);
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          title: payload,
        },
      };
      case "INSERT_DESCRIPTION":
      console.log("INSERT_DESCRIPTION", payload);
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          description: payload,
        },
      };

    default:
      throw new Error("no case for type", type);
  }
};

export default eventsReducer;
