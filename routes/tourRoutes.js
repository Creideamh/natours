const fs = require('fs');
const express = require('express');

// Custom files
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  checkId,
  checkBody,
} = require('./../controllers/tourController');

// ROUTES
const router = express.Router();

// router.param('id', checkId);

// Each router will be used as a middleware for routes
router.route('/', router).get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
