const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A tour must have a name'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'A tour must have a rating'],
    min: 2.5,
    max: 5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: 500,
    max: 10000,
  },
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;