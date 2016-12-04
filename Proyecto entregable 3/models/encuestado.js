//Importamos los datos de la conexión
var config = require('./config');
//Importamos el paquete mysql
var mysql = require('mysql');
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn

connection = mysql.createConnection(config);
//connection.connect();

//Creamos un objeto al que llamaremos encuestados
var encuestados = {};

//Obtenemos todos los encuestados
encuestados.getEncuestados = function(callback) {
	if (connection) {
		connection.query('SELECT * FROM Encuestado', function(error, rows) {
			if (error) {
				throw error;
			} else {
				callback(null, rows);
			}
		});
	}
}

//Obtenemos un Encuestado por su telefono
encuestados.getEncuestadoByTelefono = function(telefono, callback) {
	if (connection) {
		var sql = 'SELECT * FROM Encuestado WHERE telefono = ' + connection.escape(telefono);
		connection.query(sql, function(error, row) {
			if (error) {
				throw error;
			} else {
				callback(null, row);
			}
		});
	}
}


//Añadir un nuevo encuestado
encuestados.insertEncuestado = function(encuestadoData) {
	if (connection) {
		connection.query('INSERT INTO Encuestado SET ?', encuestadoData);
	}
}

//Actualizar un encuestado
encuestados.updateEncuestado = function(datosEncuestado, callback) {
	if (connection) {
		var sql = 'UPDATE Encuestado SET rut = ' + connection.escape(datosEncuestado.rut) + ', nombre = ' + connection.escape(datosEncuestado.nombre) + ' WHERE telefono = ' + connection.escape(datosEncuestado.telefono);
		connection.query(sql, function(error, result) {
			if (error) {
				throw error;
			} else {
				callback(null, {
					"mensaje": "Actualizado"
				});
			}
		});
	}
}

//Eliminar un encuestado por su telefono
encuestados.deleteEncuestado = function(telefono, callback) {
	if (connection) {
		var sql = 'DELETE FROM Encuestado WHERE telefono = ' + connection.escape(telefono);
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

}

module.exports = encuestados;