const axios = require('axios');

// https://github.com/mahemoff/geodata/blob/master/cities_with_countries.txt
const citylist = require('../resources/citylist.json')

const getCityList = (req, res) => {
  res.send(citylist);
}

const getCurrentWeather = (req, res) => {
  const city = req.params.city;
  axios.get('http://api.openweathermap.org/data/2.5/weather',
    {params: {q: city, appid: process.env.APIKEY, units: "metric"}})
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
};

const getForecast = (req, res) => {
  const city = req.params.city;
  axios.get('http://api.openweathermap.org/data/2.5/forecast',
    {params: {q: city, appid: process.env.APIKEY, units: "metric"}})
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getCityList = getCityList;
exports.getCurrentWeather = getCurrentWeather;
exports.getForecast = getForecast;