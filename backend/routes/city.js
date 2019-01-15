const express = require('express');
const router = express.Router();
const axios = require('axios'); 

router.get('/', (req, res) => {
    axios.get('https://api.openaq.org/v1/cities')
         .then(response => {
            res.send(response.data);
         })
         .catch(err => {
             console.log(err);
         });
});

module.exports = router;