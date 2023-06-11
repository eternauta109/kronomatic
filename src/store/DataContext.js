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

  /* 
var items = [ {id:2}, {id:2}, {id:2}];
var item = {...};
var foundIndex = items.findIndex(x => x.id == item.id);
items[foundIndex] = item;
*/

  const upDateEvent = (event, id) => {
    console.log("store up date vent", event, id);
    let updateEvents = state.events;
    let updateEvent = state.events.findIndex((e) => e.id === id);
    updateEvents[updateEvent] = event;
    dispatch({
      type: "UPDATE_EVENT",
      payload: { events: updateEvents },
    });
  };

  const getEvents = () => {
    dispatch({
      type: "GET_EVENTS",
    });
  };

  const value = {
    total: state.total,
    events: state.events,
    addEvent,
    upDateEvent,
    getEvents,
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
