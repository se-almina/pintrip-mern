import React, { useEffect, useState } from 'react';
import { useTripsContext } from '../hooks/useTripsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import TripDetails from '../components/TripDetails';
import TripForm from '../components/TripForm';

const Home = () => {
  const { trips, dispatch } = useTripsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_TRIPS', payload: json });
        } else {
          setError(json.error || 'Error fetching trips');
        }
      } catch (error) {
        setError('Error fetching trips');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTrips();
    }
  }, [dispatch, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='home'>
      <div className='trips'>{trips && trips.map((trip) => <TripDetails trip={trip} key={trip._id} />)}</div>
      <TripForm />
    </div>
  );
};

export default Home;
