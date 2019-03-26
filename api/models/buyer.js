import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('buyer', buyerSchema);
