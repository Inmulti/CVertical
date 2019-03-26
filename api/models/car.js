const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  vin: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'model',
  },
  year: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('car', carSchema);
