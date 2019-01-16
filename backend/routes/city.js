const express = require('express');
const router = express.Router();
const axios = require('axios'); 

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
    
    res.send(template);

    /*axios.get('https://api.openaq.org/v1/cities')
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
        });*/
});

module.exports = router;