const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

var fruits = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/data', (req, res) => {
    res.send(fruits);
});

app.post('/input', (req, res) => {
    if (fruits.hasOwnProperty(req.body.fruit)) {
        fruits[req.body.fruit] = fruits[req.body.fruit] + 1;
    } else {
        fruits[req.body.fruit] = 1;
    }
    console.log(JSON.stringify(fruits));
    res.send({ status : true});
});

app.listen(9001);