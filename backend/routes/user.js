const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const Currency = require('../models/Currency');


router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        name: req.body.name
    }).then(user => {
        if(user) {
            return res.status(400).json({
                name: 'Username already exists'
            });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                password: req.body.password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});


router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
    }

    const name = req.body.name;
    const password = req.body.password;

    User.findOne({name})
        .then(user => {
            if(!user) {
                errors.name = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name
    });
});


// FOR TESTING
router.get('/all', (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    });
});


router.get('/:id/currencies', (req, res) => {

    const id = req.params.id;

    User.findOne({name: id})
        .exec()
        .then(user => {
            let promises = user.currencies.map(c => {
                return new Promise((resolve, reject) => {
                    resolve(
                        Currency.findOne({_id: c})
                            .exec()
                            .then(r => {
                                const currencyObject = {id: r._id, short: r.short, full: r.full};
                                return currencyObject;
                            })
                            .catch(err => console.log(err))
                    );
                })
            });
            Promise.all(promises)
            .then(result => {
                res.send(result);
            })
        })
        .catch(err => {
            res.send(err);
        });
});


router.post('/:id/add', (req, res) => {

    const id = req.params.id;
    const short = req.body.short;
    const full = req.body.full;

    User.findOne({name: id}, (err, user) => {
        if(err) console.log(err);

        Currency.findOne({short: short}, (err, currency) => {
            if(err){
                console.log(err);
            } 
            if(!currency){
                const newCurrency = new Currency({
                    short: short,
                    full: full
                });
                newCurrency.save((err, currency) => {
                    if(err){
                        console.log(err);
                    }
                    user.currencies.push(currency);
                    user.save((err, user) => {
                        if(err) console.log(err);
                        res.send(currency);
                    });
                });
            }
            else {
                user.currencies.push(currency);
                user.save((err, user) => {
                    if(err) console.log(err);
                    res.send(currency);
                });
            }
        });
    });
});


router.post('/:id/remove', (req, res) => {
    
    const id = req.params.id;
    const short = req.body.short;
    const currencyId = req.body.id;

    User.updateOne({name: id}, {$pullAll: { currencies: [currencyId] } }, (err, user) => {
        if(err) console.log(err);
        res.send("Currency "+currencyName+" removed from favorites.");
    });
});

module.exports = router;