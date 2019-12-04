const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const City = require('../models/City');


const register = (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
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
                newUser.save().then(user => {res.json(user)});
              }
            });
          }
        });
      }
  });
};


const login = (req, res) => {
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
        errors.name = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = {
              id: user.id,
              name: user.name
            };
            jwt.sign(payload, process.env.SECRET, {
              expiresIn: 3600
            },
            (err, token) => {
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
};


const getCities = (req, res) => {
  const id = req.params.id;

  User.findOne({name: id})
    .exec()
    .then(user => {
      let promises = user.cities.map(c => {
        return new Promise((resolve, reject) => {
          resolve(
            City.findOne({_id: c})
              .exec()
              .then(r => {
                const cityObject = {id: r._id, name: r.name, country: r.country};
                return cityObject;
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
};


const addCity = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const country = req.body.country;

  User.findOne({name: id}, (err, user) => {
    if(err) console.log(err);

    City.findOne({name: name}, (err, city) => {
      if(err){
        console.log(err);
      }
      if(!city){
        const newCity = new City({
          name: name,
          country: country
        });
        newCity.save((err, city) => {
          if(err){
            console.log(err);
          }
          if (city in user.cities) {
            console.log('City is already added to favorites');
          } else {
            user.cities.push(city);
            user.save((err, user) => {
            if(err) console.log(err);
            res.send(city);
          });
          }
        });
      }
      else {
        user.cities.push(city);
        user.save((err, user) => {
          if(err) console.log(err);
          res.send(city);
        });
      }
    });
  });
};


const removeCity = (req, res) => {
  const id = req.params.id;
  const cityId = req.body.cityId;

  User.updateOne({name: id}, {$pullAll: { cities: [cityId] } }, (err, user) => {
    if(err) console.log(err);
    res.send("City removed from favorites.");
  });
};

exports.register = register;
exports.login = login;
exports.getCities = getCities;
exports.addCity = addCity;
exports.removeCity = removeCity;
