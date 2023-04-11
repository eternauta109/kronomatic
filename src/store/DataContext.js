import { createContext, useReducer, useContext } from "react";
import eventsReducer, { initialState } from "./reducer";

export const DataContext = createContext(initialState);

export const StoreContext = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  const addEvent = (event) => {
    const updateEvents = state.events.concat(event);
    dispatch({
      type: "ADD_EVENT",
      payload: { events: updateEvents },
    });
  };

  const value = {
    total: state.total,
    events: state.events,
    addEvent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useStore = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used with DataContext");
  }
  return context;
};

export default useStore;
