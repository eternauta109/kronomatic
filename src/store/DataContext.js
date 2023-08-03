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

  const addTitleInEvent = (title) => {
    console.log("title in sotre", title);
    dispatch({
      type: "INSERT_TITLE",
      payload: title,
    });
  };

  const addDescriptionInEvent = (descr) => {
    console.log("addDescriptionInEvent", descr);
    dispatch({
      type: "INSERT_DESCRIPTION",
      payload: descr,
    });
  };

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

  const setDate = (range) => {
    console.log("setDate", range);
    dispatch({
      type: "SET_DATE",
      payload: range,
    });
  };

  const setDivision = (division) => {
    dispatch({
      type: "SET_DIVISION",
      payload: division,
    });
  };

  const addLink = (link) => {
    dispatch({
      type: "INSERT_LINK",
      payload: link,
    });
  };

  const addNote = (note) => {
    dispatch({
      type: "INSERT_NOTE",
      payload: note,
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
    event: state.newEvent,
    addEvent,
    upDateEvent,
    addTitleInEvent,
    addDescriptionInEvent,
    getEvents,
    addLink,
    setDate,
    addNote,
    setDivision,
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
