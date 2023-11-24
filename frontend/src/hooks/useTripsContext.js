import { TripsContext } from '../context/TripsContext';
import { useContext } from 'react';

export const useTripsContext = () => {
  const context = useContext(TripsContext);

  if (!context) {
    throw Error('useTripsContext must be used inside an TripsContextProvider');
  }

  return context;
};
