const Validator = require('validator');
const isEmpty = require('./empty_check');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Username is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}