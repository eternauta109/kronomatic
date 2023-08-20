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
    dispatch({
      type: "INSERT_TITLE",
      payload: title,
    });
  };

  const addDescriptionInEvent = (descr) => {
    dispatch({
      type: "INSERT_DESCRIPTION",
      payload: descr,
    });
  };

  const upDateEvent = (event, id) => {
    let updateEvents = state.events;
    let updateEvent = state.events.findIndex((e) => e.id === id);
    updateEvents[updateEvent] = event;
    dispatch({
      type: "UPDATE_EVENT",
      payload: { events: updateEvents },
    });
  };

  const setDate = (range) => {
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

  const setManager = (manager) => {
    dispatch({
      type: "SET_MANAGER",
      payload: manager,
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

  const setEvent = (event) => {
    dispatch({
      type: "SET_EVENT",
      payload: event,
    });
  };

  const initEvent = () => {
    dispatch({
      type: "INIT_EVENT",
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
    setManager,
    upDateEvent,
    addTitleInEvent,
    addDescriptionInEvent,
    getEvents,
    initEvent,
    addLink,
    setDate,
    setEvent,
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
