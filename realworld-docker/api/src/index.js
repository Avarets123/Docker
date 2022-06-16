const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios').default;
const { connectDb } = require('./helpers/db');
const { port, host, db, authApiUrl, } = require('./configuration');


const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);




const app = express();

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly')
});

app.get('/api/testapidata', (req, res) => {
    res.json({
        testapidata: true
    })
})

app.get('/testwithcurrentuser', (req, res) => {
    axios.get(authApiUrl + "/currentUser").then(resp => {
        res.json({
            testWithCurrentUser: true,
            currentUserFromAuth: resp.data
        });
    })

    console.log('authApiUrl', authApiUrl);
});


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port:${port}`);
        console.log(`On host: ${host}`);
        console.log(`On database: ${db}`);


        const silence = new Post({ name: 'Silence' });
        silence.save(function (err, savedSilence) {
            if (err) return console.log(err);
            console.log('savedSilence!!!!', savedSilence);
        })

    });
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('open', startServer)