const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const City = require('../models/City');

const template = [
    {
        city: "Helsinki",
        country: "FI"
    },
    {
        city: "Tampere",
        country: "FI"
    }, 
    
    {
        city: "Oulu",
        country: "FI"
    }
];

router.get('/', (req, res) => {
    
    //res.send(template);

    axios.get('https://api.openaq.org/v1/cities')
        .then(response => {

            const cities = response.data.results.map(response => {
                let obj = {};
                obj.city = response.city;
                obj.country = response.country;
                return obj;
            });

            res.send(cities);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/added', (req, res) => {
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

});

module.exports = router;