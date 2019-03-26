const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Buyer = require('../models/buyer');

router.get('/', (req, res, next) => {
  Buyer.find().exec().then((docs) => {
    console.log(docs);
    if (docs.length >= 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({
        message: 'No buyers found',
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
  const buyer = new Buyer({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
  });
  buyer
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch(error => console.log(error));
  res.status(201).json({
    message: 'Handling POST request to /buyers',
    createdBuyer: buyer,
  });
});

router.get('/:buyerId', (req, res, next) => {
  const id = req.params.buyerId;
  Buyer.findById(id)
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

router.patch('/:buyerId', (req, res, next) => {
  const id = req.params.buyerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Buyer.update({ _id: id }, { $set: updateOps }).exec()
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

router.delete('/:buyerId', (req, res, next) => {
  const id = req.params.buyerId;
  Buyer.remove({ _id: id })
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
