const express = require('express');
const axios = require('axios').default;

const { connectDb } = require('./helpers/db');
const { port, host, db, apiUrl, smtpUrl } = require('./configuration');



const app = express();
app.get('/test', (req, res) => {
    res.send('Our auth server is working correctly');
});



app.get('/currentUser', (req, res) => {
    axios.get(smtpUrl + '/checkmail').then(response => {
        res.json({
            id: "123",
            email: "ava@gm.com",
            response: response.data
        });


    })

    console.log(smtpUrl);
});


app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata').then(response => {
        res.json({
            testapidata: response.data.testapidata
        })
    })
});


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port:${port}`);
        console.log(`On host: ${host}`);
        console.log(`On database: ${db}`);
    });
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('open', startServer);