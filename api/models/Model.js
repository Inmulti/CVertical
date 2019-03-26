const mongoose = require('mongoose');

const Model = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vin: String,
    make: String,
    model: String,
    year: String,
});

module.exports = mongoose.model('model', Model);