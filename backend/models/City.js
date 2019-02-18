const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        //required: true  CHECK THESE LATER!!!
    },
    country: {
        type: String,
        //required: true  CHECK THESE LATER!!!
    },
});

const City = mongoose.model('cities', CitySchema);

module.exports = City;