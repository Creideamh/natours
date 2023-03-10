const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A tour must have a name'],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty:{
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: ['easy','medium', 'hard'],
  },
  ratingsAverage: {
    type: Number,
    required: [true, 'A tour must have an average rating'],

    min: 2.5,
    max: 5.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: 500,
    max: 10000,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim: true,
   },
   imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
   },
   image: [String],
   createdAt: {
    type: Date,
    default: Date.now()
   },
   startDate: [Date]
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;