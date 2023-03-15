const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,ratingsAverage,price,summary,difficulty';
  next();
}



// 2) ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
          .filter()
          .sort()
          .limitFields()
          .paginate();

    const tours = await features.query;

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });

  } catch (err) {

    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }

};

exports.getTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    console.log(`Error encountered creating a new tour: ${  err.message}`);
  }
};

// Update tour
exports.updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,    // the updated tour is returned
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete
exports.deleteTour = async (req, res) => {

  try {
    
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });

  } catch (err) {

    res.status(404).json({
      status: 'fail',
      message: err.message,
    });

  }

};

exports.getTourStats = async (req, res) => {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
          $group: {
            _id: "$difficulty",
            numTours: { $sum: 1},
            numRatings: { $sum: '$ratingsQuantity'},
            avgrating: { $avg:  '$aratingsAverage'},
            minPrice: { $min: '$price'},
            maxPrice: { $max: '$price'},
          },
        },
        { $sort: { avgPrice: 1 }   },
        { 
          $match: { _id: { $ne: 'EASY'} }
        }
      ]);

      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });

    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
    });
  };
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan =  await Tour.aggregate([
      { $unwind: '$startDates'},
      {
        $match: {
          startDates: { 
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {$month: 'startDates'},
          numTourStarts: { $sum: 1},
          // tours: { $push: '$name'}
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    })

  } catch (error) {
    
  }

}
