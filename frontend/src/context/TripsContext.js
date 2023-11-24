import { createContext, useReducer } from 'react';

export const TripsContext = createContext();

export const tripsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRIPS':
      return {
        trips: action.payload,
      };
    case 'CREATE_TRIP':
      return {
        trips: [action.payload, ...state.trips],
      };
    case 'DELETE_TRIP':
      return {
        trips: state.trips.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TripsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripsReducer, {
    trips: null,
  });

  return <TripsContext.Provider value={{ ...state, dispatch }}>{children}</TripsContext.Provider>;
};
