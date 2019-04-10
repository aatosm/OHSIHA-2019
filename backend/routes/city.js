const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const config = require('../config.js');

// https://github.com/mahemoff/geodata/blob/master/cities_with_countries.txt
const citylist = require('../resources/citylist.json')

router.get('/', (req, res) => {
    res.send(citylist);
});


router.get('/:city/current', (req, res) => {
    
    const city = req.params.city;
    axios.get('http://api.openweathermap.org/data/2.5/weather',
                {params: {q: city, appid: config.apiKey, units: "metric"}})
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
        })
});


router.get('/:city/forecast', (req, res) => {
    
    const city = req.params.city;
    axios.get('http://api.openweathermap.org/data/2.5/forecast',
                {params: {q: city, appid: config.apiKey, units: "metric"}})
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;