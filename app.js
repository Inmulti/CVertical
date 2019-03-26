const express = require('express');
const app = express();
const serverless = require('serverless-http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const carRoutes = require('./api/routes/cars');

mongoose.connect('mongodb://cvErtical:' + process.env.MONGO_ATLAS_PW + '@cvertical-shard-00-00-mhllh.mongodb.net:27017,cvertical-shard-00-01-mhllh.mongodb.net:27017,cvertical-shard-00-02-mhllh.mongodb.net:27017/test?ssl=true&replicaSet=cvErtical-shard-0&authSource=admin&retryWrites=true', {
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   if(req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
       return res.status(200).json({});
   }
   next();
});

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

module.exports.app.serverless(app)