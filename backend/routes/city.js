const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const config = require('../config.js');

// https://github.com/mahemoff/geodata/blob/master/cities_with_countries.txt
const citylist = require('../resources/citylist.json')

router.get('/', (req, res) => {
    res.send(citylist);
    
    /*axios.get('http://data.fixer.io/api/symbols', {params: {access_key: "14489d7afe9f3e398691e76630e26718"}})
        .then(response => {
            
            function prettifyResult() {
                let promise = new Promise((resolve, reject) => {
                    let list = [];
                    for(key in response.data.symbols){
                        list.push({short: key, full: response.data.symbols[key]});
                    }
                    resolve(list);
                });
                return promise; 
            } 
            
            prettifyResult().then((result, err) => {
                if(err) console.log(err);
                res.send(result);
            })

        })
        .catch(err => {
            console.log(err);
        });*/
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