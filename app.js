const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-sample.json`)
);

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found, Invalid tour ID',
    });
  }

  const tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
const updateTour = (req, res) => {
  if (parseInt(req.params.id) < tours.length) {
    return res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here......>',
      },
    });
  }
};

// Delete
const deleteTour = (req, res) => {
  if (parseInt(req.params.id) < tours.length) {
    return res.status(200).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  }

  res.status(404).json({
    status: 'error',
    message: 'Tour not found, Invalid tour ID',
  });
};

// Get all users
const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not yet being defined',
  });
};

// Create User
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This create userroute has not yet being defined',
  });
};

// Get user by ID
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This get user route has not yet being defined',
  });
};

// Update user
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'tHIS update user routes has not yet been defined',
  });
};

// Delete user
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This delete user route has not yet been defined',
  });
};

// ROUTES
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

// Each router will be used as a middleware for routes
tourRouter.route('/').get(getAllTours).patch(updateTour).delete(deleteTour);

// Users
const UserRouter = express.Router();
app.use('/api/v1/users', UserRouter);

UserRouter.route('/').get(getUsers).post(createUser);

UserRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// START SERVER
const port = 8080;
app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
