const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    food: {
      type: String,
      required: true,
    },
    music: {
      type: String,
      required: true,
    },
    tips: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer, // Store the image data as a Buffer directly
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
