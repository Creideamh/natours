const dotenv = require('dotenv');

// Entry file
const app = require('./app');

dotenv.config({
  path: './config.env',
});

console.log(process.env);

// START SERVER
const port = process.env.PORT || 8000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
