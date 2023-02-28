/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Entry file
const app = require('./app');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindandModify: false,
  })
  .then((con) => {
    console.log('DB connection to dsafely');
  });

// START SERVER
const port = process.env.PORT || 8000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
