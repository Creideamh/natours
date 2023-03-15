const fs = require('fs');
const express = require('express');

// Custom files
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
,} = require('./../controllers/tourController');

// ROUTES
const router = express.Router();

// router.param('id', checkId);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/top-5-cheap').get(aliasTopTours,  getAllTours);

// Each router will be used as a middleware for routes
router.route('/', router).get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
