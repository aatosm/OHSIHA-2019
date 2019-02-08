const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const Currency = require('../models/Currency');

router.get('/', (req, res) => {

    const template = [
        {
            short: "BTC",
            full: "Bitcoin"
        },
        {
            short: "RUB",
            full: "Russian Ruble"
        },
        {
            short: "USD",
            full: "United States Dollar"
        }
    ];

    res.send(template);
    
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

/*router.get('/added', (req, res) => {
    City.find({}).then(cities => {
        res.send(cities);
    });
});

router.post('/add/:name', (req, res) => {
    const cityName = req.params.name;
    console.log(cityName);
    //const country = req.body.country;
    const country = 'FI';

    City.findOne({name: cityName, country: country}, (err, city) => {
        if(err){
            console.log(err);
            res.send(err);
        } 
        if(!city){
            const newCity = new City({
                name: cityName,
                country: country
            });
            newCity.save((err, city) => {
                if(err){
                    console.log(err);
                    res.send(err); // TODO: maybe causes the "Cant set headers after sent"
                }
                res.json(city);
            });
        }
        else {
            res.send("City already exists in db");
        }
    });

});*/

module.exports = router;