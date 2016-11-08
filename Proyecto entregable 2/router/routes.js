var express = require('express');
var app = express();
var path = require('path');


app.get('/test', function(req, res) {
	return res.render('readusers.html');
});

app.get('/create/user', function(req, res) {
	return res.render('createuser.html');
});

app.get('/delete/user', function(req, res) {
	return res.render('deleteuser.html');
});
app.get('/', function(req, res) {
	return res.render('index.html');
});
app.get('/adminView', function(req, res) {
	return res.render('admin_view.html');
});

/*app.get('/api/usuarios', function(req, res) {
	res.render('index_users')
});

app.put('/api/usuario/:username', function(req, res) {
	res.render('edit');
});*/



module.exports = app;