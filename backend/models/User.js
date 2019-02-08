const mongoose = require('mongoose');
const Currency = require('./Currency');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currencies: [{type: Schema.Types.ObjectId, ref: 'Currency'}]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;