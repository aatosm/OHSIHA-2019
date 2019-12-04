const cityController = require('./controllers/city-controller');
const userController = require('./controllers/user-controller')

const express = require('express');
const router = express.Router();

// test
router.get('/', (req, res) => {
  res.send("success");
});

// Cities

router.get('/cities', cityController.getCityList);
router.get('/cities/:city/current', cityController.getCurrentWeather);
router.get('/cities/:city/forecast', cityController.getForecast);

// Users

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get('/users/:id/cities', userController.getCities);
router.post('/users/:id/add', userController.addCity);
router.post('/users/:id/remove', userController.removeCity);

module.exports = router;