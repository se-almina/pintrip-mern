import { useTripsContext } from '../hooks/useTripsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TripDetails = ({ trip }) => {
  const { dispatch } = useTripsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/trips/' + trip._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();

      dispatch({ type: 'DELETE_TRIP', payload: json });
    }
  };

  return (
    <div className='trip-details'>
      <h4>{trip.title}</h4>
      <p>
        <strong>Location: </strong>
        {trip.location}
      </p>
      <p>
        <strong>Food: </strong>
        {trip.food}
      </p>
      <p>
        <strong>Music to listen: </strong>
        {trip.music}
      </p>
      <p>
        <strong>Tips for the trip: </strong>
        {trip.tips}
      </p>
      {/* {trip.image && (
        <div>
          <strong>Image:</strong>
          <img src={`data:${trip.image.contentType || 'image/jpeg'};base64,${trip.image.name}`} alt='Trip Image' />
        </div>
      )} */}
      {trip.image && <img src={`data:${trip.image.contentType};base64,${trip.image.data}`} alt='Trip Image' />}

      <p>{formatDistanceToNow(new Date(trip.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TripDetails;
