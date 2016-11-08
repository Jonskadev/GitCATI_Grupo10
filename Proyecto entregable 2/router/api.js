//Importamos express
var express = require('express');
//Creamos el objeto para definir las rutas
var router = express.Router();
//Importamos el modelo que ejecutará las sentencias SQL
var usuariosModel = require('../models/usuario');
var proyectosModel = require('../models/proyecto');
var estadosModel = require('../models/estado');

module.exports = router;

//Coger todos los usuarios
router.route('/usuarios')
	.get(function(request, response) {
		usuariosModel.getUsuarios(function(error, data) {
			var datos = data;
			return response.status(200).json(datos);

		});
	})
	.post(function(request, response) {
		var datosUsuario = {
			username: request.body.username,
			password: request.body.password,
			email: request.body.email,
			permiso: request.body.permiso
		};
		usuariosModel.insertUsuario(datosUsuario, function(error, datos) {
			if (datos) {
				return response.status(200).json({
					"Mensaje": "Insertado"
				});
			} else {
				return response.status(500).json({
					"Mensaje": "Error"
				});
			}
		});
	});

router.route('/usuarios/:username')
	.delete(function(request, response) {
		var username = request.params.username;
		usuariosModel.deleteUsuario(username, function(error, datos) {
			if (datos && datos.mensaje === "Borrado") {
				return response.status(200).json(datos);
			} else {
				return response.status(500).json({
					"Mensaje": "Error"
				});
			}
		})
	})
	.put(function(request, response) {
		var datosUsuario = {
			username: request.params.username,
			password: request.body.password,
			email: request.body.email
		};
		usuariosModel.updateUsuario(datosUsuario, function(error, datos) {
			//si el usuario se ha actualizado correctamente mostramos un mensaje
			if (datos && datos.mensaje) {
				return response.status(200).json(datos);
			} else {
				return response.status(500).json({
					"mensaje": "Error"
				});

			}
		});
	});

//Coger todos los proyectos
router.route('/proyectos')
	.get(function(request, response) {
		proyectosModel.getProyectos(function(error, data) {
			var datos = data;
			return response.status(200).json(datos);

		});
	})
	.post(function(request, response) {
		var datosProyecto = {
			idProyecto: request.body.idProyecto,
			nombre: request.body.nombre
		};
		proyectosModel.insertProyecto(datosProyecto, function(error, datos) {
			if (datos) {
				return response.status(200).json({
					"Mensaje": "Insertado"
				});
			} else {
				return response.status(500).json({
					"Mensaje": "Error"
				});
			}
		});
	});

router.route('/proyectos/:idProyecto')
	.delete(function(request, response) {
		var idProyecto = request.params.idProyecto;
		proyectosModel.deleteProyecto(idProyecto, function(error, datos) {
			if (datos && datos.mensaje === "Borrado") {
				return response.status(200).json(datos);
			} else {
				return response.status(500).json({
					"Mensaje": "Error"
				});
			}
		})
	})
	.put(function(request, response) {
		var datosProyecto = {
			idProyecto: request.params.idProyecto,
			nombre: request.body.nombre
		};
		proyectosModel.updateProyecto(datosProyecto, function(error, datos) {
			//si el proyecto se ha actualizado correctamente mostramos un mensaje
			if (datos && datos.mensaje) {
				return response.status(200).json(datos);
			} else {
				return response.status(500).json({
					"mensaje": "Error"
				});

			}
		});
	});

//Coger todos los estados
router.route('/estados')
	.get(function(request, response) {
		estadosModel.getEstados(function(error, data) {
			var datos = data;
			return response.status(200).json(datos);

		});
	})
	.post(function(request, response) {
		var datosEstado = {
			state_name: request.body.state_name,
		};
		estadosModel.insertEstado(datosEstado, function(error, datos) {
			if (datos) {
				return response.status(200).json({
					"Mensaje": "Insertado"
				});
			} else {
				return response.status(500).json({
					"Mensaje": "Error"
				});
			}
		});
	});

router.route('/estados/:state_name')
	.delete(function(request, response) {
		var state_name = request.params.state_name;
		estadosModel.deleteEstado(state_name, function(error, datos) {
			if (datos && datos.mensaje === "Borrado") {
				return response.status(200).json(datos);
			} else {
				return response.status(500).json({
					"Mensaje": "Error"
				});
			}
		})
	});


//Coger usuario por username
/*router.route('/usuarios')
	.get(function(request, response) {
		var username = request.params.username;
		usuariosModel.getUsuarioByUsername(username, function(error, datos) {
			if (typeof datos !== 'undefined' && datos.length > 0) {
				response.status(200).json(datos);
			} else {
				response.status(404).json({
					"Mensaje": "No existe"
				});
			}
		});
	})*/

//Insertar usuario
/*
Ejemplo de uso:
en el Body:
{ 
"nombre": "Usuario de Prueba"
}


*/