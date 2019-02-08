const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    short: {
        type: String,
        //required: true  CHECK THESE LATER!!!
    },
    full: {
        type: String,
        //required: true  CHECK THESE LATER!!!
    },
});

const Currency = mongoose.model('currencies', CurrencySchema);

module.exports = Currency;