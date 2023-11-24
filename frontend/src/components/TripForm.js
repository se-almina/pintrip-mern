import { useState } from 'react';
import { useTripsContext } from '../hooks/useTripsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TripForm = () => {
  const { dispatch } = useTripsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [food, setFood] = useState('');
  const [music, setMusic] = useState('');
  const [tips, setTips] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data:', title, location, food, music, tips, image);

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // const trip = { title, location, food, music, tips };
    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('food', food);
    formData.append('music', music);
    formData.append('tips', tips);
    formData.append('image', image);

    console.log('Form Data:', title, location, food, music, tips, image);
    console.log('Selected File:', image);

    const response = await fetch('/api/trips', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log('Response:', json);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setLocation('');
      setFood('');
      setMusic('');
      setTips('');
      setImage(null);
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_TRIP', payload: json });
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit} encType='multipart/form-data'>
      <h3 className='main-title'>Pin a New Trip</h3>

      <label>Trip Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Location:</label>
      <input
        type='text'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes('location') ? 'error' : ''}
      />

      <label>Food:</label>
      <input
        type='text'
        onChange={(e) => setFood(e.target.value)}
        value={food}
        className={emptyFields.includes('food') ? 'error' : ''}
      />
      <label>Music:</label>
      <input
        type='text'
        onChange={(e) => setMusic(e.target.value)}
        value={music}
        className={emptyFields.includes('music') ? 'error' : ''}
      />
      <label>Tips:</label>
      <input
        type='text'
        onChange={(e) => setTips(e.target.value)}
        value={tips}
        className={emptyFields.includes('tips') ? 'error' : ''}
      />
      <label>Image:</label>
      <input type='file' accept='image/jpeg, image/png' onChange={(e) => setImage(e.target.files[0])} />

      <button>Pin Your Trip</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default TripForm;
