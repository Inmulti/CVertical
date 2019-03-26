const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Model = require('../models/model');

router.get('/', (req, res, next) => {
  Model.find().exec().then((docs) => {
    console.log(docs);
    if (docs.length >= 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({
        message: 'No models found',
      });
    }
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', (req, res, next) => {
  const model = new Model({
    _id: new mongoose.Types.ObjectId(),
    model: req.body.model,
    make: req.body.make,
  });
  model
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch(error => console.log(error));
  res.status(201).json({
    message: 'Handling POST request to /models',
    createdModel: model,
  });
});

router.get('/:modelId', (req, res, next) => {
  const id = req.params.modelId;
  Model.findById(id)
    .exec()
    .then((doc) => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:modelId', (req, res, next) => {
  const id = req.params.modelId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Model.update({ _id: id }, { $set: updateOps }).exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:modelId', (req, res, next) => {
  const id = req.params.modelId;
  Model.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
