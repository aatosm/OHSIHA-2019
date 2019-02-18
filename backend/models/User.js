const mongoose = require('mongoose');
const City = require('./City');

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
    cities: [{type: Schema.Types.ObjectId, ref: 'City'}]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;