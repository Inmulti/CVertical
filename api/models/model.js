const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  model: {
    type: String,
    required: true,
    trim: true,
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('model', modelSchema);
