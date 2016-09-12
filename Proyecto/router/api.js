//Dependecies
var express = require('express');
var router= express.Router();
var models  = require('../models');

//Return router
module.exports = router;


//GET usuarios
router.get('/usuarios', function(req, res, next) {
	try {
		models.Usuario.findAll().then(function (user) {
			res.render('VerUsuario.html', {title: 'Listar Usuarios', resultado: user});
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});
//GET un usuario con username determinado
router.get('/usuarios/:username', function(req, res, next) {
	try {
		console.log(req.params.username);
		models.Usuario.findAll({
			where: {
				username: req.params.username
			}
		}).then(function (user) {
			res.render('VerUsuario.html', {title: 'Listar Usuarios', resultado: user});
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});

//POST crear usuario
router.post('/usuarios', function(req,res,next){
try{
	console.log(req.body.permiso);
	models.Usuario.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		permiso: req.body.permiso
	}).then(function (result) {
		res.redirect("/");
	});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

router.put('/usuarios/:username', function(req,res,next){
	try{

		models.Usuario.findOne({ where: {username:req.params.username} }).then(function (user) {
			if(req.body.username){
				if(req.body.email) {
					user.updateAttributes({
						username: req.body.username,
						email: req.body.email
					}).then(function (result) {
						res.send(result);
					})
				}
				else {
					user.updateAttributes({
						username: req.body.username
					}).then(function (result) {
						res.send(result);
					})
				}

			}
		});
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

router.delete('/usuarios/:username', function(req,res,next){
	try{
		models.Usuario.destroy({where: {username: req.params.username} }).then(function () {
			return models.Usuario.findAll().then(function (user) {
				res.json(user);
			})
		})
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

