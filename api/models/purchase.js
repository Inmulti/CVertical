import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Buyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'buyer',
  },
  Car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'car',
  },
  Price: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('purchase', purchaseSchema);
