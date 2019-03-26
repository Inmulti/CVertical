const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Purchase = require('../models/purchase');

router.get('/', (req, res, next) => {
    Purchase.find().exec().then((docs) => {
    console.log(docs);
    if (docs.length >= 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({
        message: 'No purchases found',
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
  const purchase = new Purchase({
      _id: new mongoose.Types.ObjectId(),
      Buyer: req.body.Buyer,
      Car: req.body.Car,
      Price: req.body.Price
  });
  purchase
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch(error => console.log(error));
  res.status(201).json({
    message: 'Handling POST request to /purchases',
    createdPurchase: purchase,
  });
});

router.get('/:purchaseId', (req, res, next) => {
  const id = req.params.purchaseId;
    Purchase.findById(id)
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

router.patch('/:purchaseId', (req, res, next) => {
  const id = req.params.purchaseId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
    Purchase.update({ _id: id }, { $set: updateOps }).exec()
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

router.delete('/:purchaseId', (req, res, next) => {
  const id = req.params.purchaseId;
    Purchase.remove({ _id: id })
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
