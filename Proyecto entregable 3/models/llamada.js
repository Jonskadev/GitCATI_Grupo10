//Importamos los datos de la conexión
var config = require('./config');
//Importamos el paquete mysql
var mysql = require('mysql');
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn

connection = mysql.createConnection(config);
//connection.connect();

//Creamos un objeto al que llamaremos usuarios
var llamada = {};

//Obtenemos todos las llamadas
llamada.getLlamada = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM Llamada', function(error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

//Añadir una nueva llamada
llamada.insertLlamada = function(llamadaData, callback) {
    if (connection) {
        connection.query('INSERT INTO Llamada SET ?', llamadaData, function(error, result) {
            if (error) {
                throw error;
            } else {
                //devolvemos el id del usuario insertado
                callback(null, result.affectedRows);
            }
        });
    }
}

module.exports = llamada;