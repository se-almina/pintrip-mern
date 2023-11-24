const express = require('express');
const { getTrips, getTrip, createTrip, deleteTrip, updateTrip } = require('../controllers/tripController');
const requireAuth = require('../middleware/requireAuth');
const multer = require('multer');

const Storage = multer.diskStorage({
  destination: '../frontend/src/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single('image');

const router = express.Router();

// require auth for all trip routes
router.use(requireAuth);

// GET all trips
router.get('/', getTrips);

// GET a single trip
router.get('/:id', getTrip);

// POST a new trip with file upload handling
router.post('/', upload, createTrip);

// DELETE a trip
router.delete('/:id', deleteTrip);

// UPDATE a trip
router.patch('/:id', updateTrip);

module.exports = router;
