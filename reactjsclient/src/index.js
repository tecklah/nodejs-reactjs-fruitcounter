import Chart from './components/Chart';
import Form from './components/Form';
import React from 'react';
import ReactDOM from 'react-dom';

var jquery = require('jquery');
var bootstrap = require('bootstrap');

require('bootstrap/dist/css/bootstrap.css');

ReactDOM.render(
    <Form />,
    document.getElementById('form')
);

ReactDOM.render(
    <Chart />,
    document.getElementById('report')
);