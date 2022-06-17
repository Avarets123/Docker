const express = require('express');

const { port } = require('../configuration')

const app = express();



app.get('/smtp/checkmail', (req, res) => {
    res.json("message sended");
});



app.listen(port, () => {
    console.log('Our smtp service working correctly');
})