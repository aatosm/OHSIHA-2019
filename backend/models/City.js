const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const City = mongoose.model('cities', CitySchema);

module.exports = City;