export const initialState = {
  total: 0,
  events: [
    {
      color: "#7DCEA0",
      description: "distribuire menu mario",
      division: "operations",
      end: new Date(2023, 3, 21), //yyyy,mm,dd
      note: "reato manageriali",
      start: new Date(2023, 3, 10),
      title: "menu mario",
    },
    {
      color: "#F39C12",
      description: "volantini",
      division: "marketing",
      end: new Date(2023, 3, 5), //yyyy,mm,dd
      note: "reato manageriali",
      start: new Date(2023, 3, 5),
      title: "montare stand mario bross",
    },
    {
      color: "#BB8FCE",
      description: "prezzare film new",
      division: "pricing",
      end: new Date(2023, 3, 15), //yyyy,mm,dd
      note: "",
      start: new Date(2023, 3, 15),
      title: "prezzare film new",
    },
    {
      color: "#AAB7B8",
      description: "smantellamento collonne foyer",
      division: "facilities",
      end: new Date(2023, 3, 16), //yyyy,mm,dd
      note: "",
      start: new Date(2023, 3, 10),
      title: "colonne foyer",
    },
  ],
};

const eventsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_EVENT":
      console.log("ADD_EVENT", payload);
      return { ...state, events: payload.events };

    default:
      throw new Error("no case for type", type);
  }
};

export default eventsReducer;
