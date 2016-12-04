//Importamos express
var express = require('express');
//Creamos el objeto para definir las rutas
var router = express.Router();
//Importamos el modelo que ejecutará las sentencias SQL
var usuariosModel = require('../models/usuario');
var proyectosModel = require('../models/proyecto');
var estadosModel = require('../models/estado');
var llamadaModel = require('../models/llamada');
var encuestadosModel = require('../models/encuestado');
var encuestadoproyecto = require('../models/encuestadoproyecto');
var csvParse = require('csv-parse');
var events = require('events');
var flow = new events.EventEmitter();

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

		flow.once('check', function() {
			if (request.body['username'] && request.body['password'] && request.body['email']) {
				flow.emit('check_username');
			} else {
				response.send(412);
			}
		});

		flow.once('check_username', function() {
			connection.query(
				'SELECT * FROM Usuario WHERE `username` = ?',
				request.body['username'],
				function(error, results, fields) {
					if (error) throw error;
					console.log(results.length);
					if (results.length == 0) {
						flow.emit('signup');
					} else {
						respose.send(409); //EL USUARIO YA EXISTE , CONFLICT
					}

				}
			);
		});

		flow.once('signup', function() {

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

		flow.emit('check');

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
	//insertar proyecto
	.post(function(request, response) {
		var datosProyecto = {
			idProyecto: request.body.idProyecto,
			nombre: request.body.nombre,
			link: request.body.link,
			activo: 0
		};
		proyectosModel.insertProyecto(datosProyecto, function(error, datos) {
			if (datos) {
				/*return response.status(200).json({
					"Mensaje": "Insertado"
				});*/
				csvParse(request.body.archivo, {
					delimiter: ';'
				}, function(err, contacts) {
					for (var i = 1; i < contacts.length; i++) {
						var res = contacts[i][0].split(",");
						var datosEncuestado = {
							telefono: res[1],
							rut: res[2],
							nombre: res[0]
						};
						encuestadosModel.insertEncuestado(datosEncuestado);
						var datosEncProy = {
							idProyecto: datosProyecto.idProyecto,
							telefono: datosEncuestado.telefono,
							estado: "No contesta"
						};
						encuestadoproyecto.insertEncProy(datosEncProy);
					}
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
		nombre: request.body.nombre,
		link: request.body.link,
		activo: request.body.activo
	};
	//modificar proyecto sin activo
	if (datosProyecto.idProyecto && datosProyecto.nombre && datosProyecto.link)
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
	//modificar proyecto con activo
	if (!datosProyecto.nombre && !datosProyecto.link)
		proyectosModel.updateActivo(datosProyecto, function(error, datos) {
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

router.route('/llamada')
	.get(function(request, response) {
		llamadaModel.getLlamada(function(error, data) {
			var datos = data;
			return response.status(200).json(datos);

		});
	})
	//insertar llamada
	.post(function(request, response) {
		var datosLlamada = {
			idLlamada: request.body.idLlamada,
			observaciones: request.body.observaciones,
			username: request.body.username,
			telefono: request.body.telefono
		};
		llamadaModel.insertLlamada(datosLlamada, function(error, datos) {
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

router.route('/encuestadoproyecto/:idProyecto/:telefono')
    .get(function(request, response) {
        var idProyecto = request.params.idProyecto;
        var telefono = request.params.telefono;
        encuestadoproyecto.getestado(idProyecto, telefono, function(error, datos) {
            if (datos) {
                return response.status(200).json(datos);
            } else {
                return response.status(500).json({
                    "Mensaje": "Error"
                });
            }
        });
    }).put(function(request, response) {
    var datosEncProy = {
        idProyecto: request.params.idProyecto,
        telefono: request.params.telefono,
        estado: request.body.estado
    };
    encuestadoproyecto.updateEncProy(datosEncProy, function(error, datos) {
        //si se ha actualizado correctamente mostramos un mensaje
        if (datos && datos.mensaje) {
            return response.status(200).json(datos);
        } else {
            return response.status(500).json({
                "mensaje": "Error"
            });
        }
    });
});

router.route('/encuestadoproyecto')
	.get(function(request, response) {
		encuestadoproyecto.getencproy(function(error, data) {
			var datos = data;
			return response.status(200).json(datos);

		});
	})

	//Coger todos los estados
	/*router.route('/estados')
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
		});*/

/*router.route('/estados/:state_name')
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
	});/*


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