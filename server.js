require('dotenv').config();

const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('colors');

// variables
const PORT = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(morgan('tiny'));

// Rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  })
);

// routes
app.use('/', mainRoutes);

// Fallback route for 404
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green);
});
