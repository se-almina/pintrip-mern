import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TripsContextProvider } from './context/TripsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TripsContextProvider>
        <App />
      </TripsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
