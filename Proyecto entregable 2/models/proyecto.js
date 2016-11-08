//Importamos los datos de la conexión
var config = require('./config');
//Importamos el paquete mysql
var mysql = require('mysql');
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn

connection = mysql.createConnection(config);
//connection.connect();

//Creamos un objeto al que llamaremos proyectos
var proyectos = {};

//Obtenemos todos los proyectos
proyectos.getProyectos = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM Proyecto', function(error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
};

//Obtenemos un proyecto por su id
proyectos.getProyectoById = function(idProyecto, callback) {
    if (connection) {
        var sql = 'SELECT * FROM Proyecto WHERE idProyecto = ' + connection.escape(idProyecto);
        connection.query(sql, function(error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
};


//Añadir un nuevo proyecto
proyectos.insertProyecto = function(proyectoData, callback) {
    if (connection) {
        connection.query('INSERT INTO Proyecto SET ?', proyectoData, function(error, result) {
            if (error) {
                throw error;
            } else {
                //devolvemos el id del proyecto insertado
                callback(null, result.affectedRows);
            }
        });
    }
};

//Actualizar un proyecto
proyectos.updateProyecto = function(proyectoData, callback) {
    if (connection) {
        var sql = 'UPDATE Proyecto SET nombre = ' + connection.escape(proyectoData.nombre) + ' WHERE idProyecto = ' + connection.escape(proyectoData.idProyecto);
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
};

//Eliminar un proyecto por su id
proyectos.deleteProyecto = function(idProyecto, callback) {
    if (connection) {
        var sql = 'DELETE FROM Proyecto WHERE idProyecto = ' + connection.escape(idProyecto);
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

module.exports = proyectos;