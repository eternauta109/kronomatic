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
