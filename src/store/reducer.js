export const initialState = {
  total: 0,
  events: [],
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
