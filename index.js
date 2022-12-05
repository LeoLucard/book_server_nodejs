const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Custom Import
const Router = require('./routes/book_route');
const {worker} = require('./helper/auto_worker');

//Express App
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
app.use(cors());

//Constant
const localServer = "mongodb://user:leolucard4821@ac-prg0try-shard-00-00.aafstkw.mongodb.net:27017,ac-prg0try-shard-00-01.aafstkw.mongodb.net:27017,ac-prg0try-shard-00-02.aafstkw.mongodb.net:27017/allkarpro?replicaSet=atlas-78xuu7-shard-0&ssl=true&authSource=admin";

//Routes
app.use('/api',Router);


//App start
try {
    mongoose.connect(localServer, () => {
        const port = process.env.PORT || process.env.API_PORT;
        worker();
        console.log(`Starting server at ${new Date()}` + port);
        app.listen(port);
    });
} catch (error) {
    console.log(error);
}