/**
 * Created by Geordy on 30-08-2016.
 */

var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hola ke ase');
});

module.exports = app;
