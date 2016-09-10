/**
 * Created by Geordy on 30-08-2016.
 */

var ip = require('ip');
var express = require('express');

var app = express();

/*var path = require('path');
var mysql = require('mysql');
var Usuario= require('./models/usuario.js');*/
var models = require("./models/index.js");

//console.log(variable)

models.sequelize.sync().then(function () {
    var server = app.listen(3000,function(){
        var host = ip.address();
        var port = server.address().port;
        console.log('El sevidor escucha en localhost:%s',port);
    });
});

var controller = require('./homeController.js');

app.use(controller);