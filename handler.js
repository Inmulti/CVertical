// handler.js
'use strict';

const express = require('express');
const serverless = require('serverless-http');
const MongoClient = require('mongodb').MongoClient;
const mongoConnStr = 'mongodb+srv://cvErtical:cvErtical@cvertical-mhllh.mongodb.net/test?retryWrites=true';
const carRoutes = require('./api/routes/cars');

const client = new MongoClient(mongoConnStr, {
    useNewUrlParser: true,
});

const app = express();

app.use('/cars', carRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = {
    app,
    hello: serverless(app),
};