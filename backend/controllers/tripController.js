const Trip = require('../models/tripModel');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

// get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single trip
const getTrip = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such trip' });
    }

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ error: 'No such trip' });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new trip
const createTrip = async (req, res) => {
  console.log('Received data:', req.body);
  console.log('Received file:', req.file);

  const { title, location, food, music, tips } = req.body;

  // Log the received file
  console.log('Received file:', req.file);

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!location) {
    emptyFields.push('location');
  }
  if (!food) {
    emptyFields.push('food');
  }
  if (!music) {
    emptyFields.push('music');
  }
  if (!tips) {
    emptyFields.push('tips');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    // Check if req.file exists before accessing buffer
    const image = req.file ? req.file.buffer : null;

    console.log('Image data:', image);

    const trip = await Trip.create({ title, location, food, music, tips, image });

    // Convert image to base64 if it exists
    const tripWithBase64Image = {
      ...trip.toObject(),
      image: image ? image.toString('base64') : null,
    };
    res.status(200).json(tripWithBase64Image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a trip
const deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such trip' });
    }

    const trip = await Trip.findOneAndDelete({ _id: id });

    if (!trip) {
      return res.status(400).json({ error: 'No such trip' });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a trip
const updateTrip = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such trip' });
    }

    // Set the { new: true } option to get the updated document
    const trip = await Trip.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!trip) {
      return res.status(400).json({ error: 'No such trip' });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  deleteTrip,
  updateTrip,
};
