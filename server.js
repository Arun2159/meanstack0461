//server.js
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var config = require('./config/config.json');
const Product = require('./models/productModel');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())

app.use('/a1/', require('./routes/route')); 

connectMongo();
mongoose.set("strictQuery",false)
function listen() {
        app.listen(config.PORT, function () {
            console.log('Server is running on Port', config.PORT);
        }).on('error', function () {
            console.log('Server is not running on Port', config.PORT);
        });
    }       

function connectMongo() {
        mongoose.connection
            .on('error', function (err) {
                console.log('Mongo connection error', console.log);
     }).on('disconnected', connectMongo).once('open', listen);
    
    if(mongoose.connection.readyState != 1) {
            mongoose.connect(config.mongo.connectionString, config.options);   
            console.log('connected to mongodb ok');     
    }
}

