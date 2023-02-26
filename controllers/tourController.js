const fs = require('fs');

// read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-sample.json`)
);

// 2) ROUTE HANDLERS

exports.checkId = (req, res, next, val) => {
  console.log(`Tour ID is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID provided',
    });
  }
  next();
};

/**
 * Create a checkBody middleware
 * Check if body contains the name and price property
 * if not, send back 4000 (bad request)
 * Add it to the post handler stack
 */
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide name and price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-sample.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Update tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here......>',
    },
  });
};

// Delete
exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
