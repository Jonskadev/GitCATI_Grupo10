//Importamos los datos de la conexión
var config = require('./config');
//Importamos el paquete mysql
var mysql = require('mysql');
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn

var encuestadoproyecto = {};

encuestadoproyecto.insertEncProy = function(EncProyData) {
    if (connection) {
        connection.query('INSERT INTO `Encuestado-Proyecto` SET ?', EncProyData);
    }
};

//Obtenemos todos las llamadas
encuestadoproyecto.getestado = function(idProyecto, telefono, callback) {
    if (connection) {
        connection.query('SELECT estado FROM `Encuestado-Proyecto` WHERE idProyecto =' + connection.escape(idProyecto) + ' AND telefono =' + connection.escape(telefono), function(error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

encuestadoproyecto.updateEncProy = function(datosEncProy, callback) {
    if (connection) {
        var sql = 'UPDATE `Encuestado-Proyecto` SET estado = ' + connection.escape(datosEncProy.estado) + 'WHERE idProyecto = ' + connection.escape(datosEncProy.idProyecto) + 'AND telefono =' + connection.escape(datosEncProy.telefono);
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

//Obtenemos todos los encuestado-proyecto
encuestadoproyecto.getencproy = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM `Encuestado-Proyecto`', function(error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

module.exports = encuestadoproyecto;