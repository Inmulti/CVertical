const express = require('express');

const app = express();
const serverless = require('serverless-http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const carRoutes = require('./api/routes/cars');
const modelRoutes = require('./api/routes/models');
const buyerRoutes = require('./api/routes/buyers');
const purchaseRoutes = require('./api/routes/purchases');

mongoose.connect('mongodb+srv://cvErtical:cvErtical@cvertical-mhllh.mongodb.net/test?retryWrites=true', {
  useMongoClient: true,
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/cars', carRoutes);
app.use('/models', modelRoutes);
app.use('/buyers', buyerRoutes);
app.use('/purchases', purchaseRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = {
  app,
  hello: serverless(app),
};
