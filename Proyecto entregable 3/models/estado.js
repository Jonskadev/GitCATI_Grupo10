//Importamos los datos de la conexión
var config = require('./config');
//Importamos el paquete mysql
var mysql = require('mysql');
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn

connection = mysql.createConnection(config);
//connection.connect();

//Creamos un objeto al que llamaremos estados
var estados = {};

//Obtenemos todos los estados
estados.getEstados = function(callback) {
	if (connection) {
		connection.query('SELECT * FROM Estado', function(error, rows) {
			if (error) {
				throw error;
			} else {
				callback(null, rows);
			}
		});
	}
};

//Obtenemos un Estado por su id
estados.getEstadoByState_name = function(state_name, callback) {
	if (connection) {
		var sql = 'SELECT * FROM Estado WHERE state_name = ' + connection.escape(state_name);
		connection.query(sql, function(error, row) {
			if (error) {
				throw error;
			} else {
				callback(null, row);
			}
		});
	}
};

//Añadir un nuevo Estado
estados.insertEstado = function(estadoData, callback) {
	if (connection) {
		connection.query('INSERT INTO Estado SET ?', estadoData, function(error, result) {
			if (error) {
				throw error;
			} else {
				//devolvemos el id del estado insertado
				callback(null, result.affectedRows);
			}
		});
	}
};

//Eliminar un Estado por su id
estados.deleteEstado = function(state_name, callback) {
	if (connection) {
		var sql = 'DELETE FROM Estado WHERE state_name = ' + connection.escape(state_name);
		connection.query(sql, function(error, result) {
			if (error) {
				throw error;
			} else {
				callback(null, {
					"mensaje": "Borrado"
				});
			}
		});
	}

};

module.exports = estados;