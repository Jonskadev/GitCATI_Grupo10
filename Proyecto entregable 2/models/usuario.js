//Importamos los datos de la conexión
var config = require('./config');
//Importamos el paquete mysql
var mysql = require('mysql');
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn

connection = mysql.createConnection(config);
//connection.connect();

//Creamos un objeto al que llamaremos usuarios
var usuarios = {};

//Obtenemos todos los usuarios
usuarios.getUsuarios = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM Usuario', function(error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

//Obtenemos un usuario por su username
usuarios.getUsuarioByUsername = function(username, callback) {
    if (connection) {
        var sql = 'SELECT * FROM Usuario WHERE username = ' + connection.escape(username);
        connection.query(sql, function(error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}


//Añadir un nuevo usuario
usuarios.insertUsuario = function(usuarioData, callback) {
    if (connection) {
        connection.query('INSERT INTO Usuario SET ?', usuarioData, function(error, result) {
            if (error) {
                throw error;
            } else {
                //devolvemos el id del usuario insertado
                callback(null, result.affectedRows);
            }
        });
    }
}

//Actualizar un usuario
usuarios.updateUsuario = function(datosUsuario, callback) {
    if (connection) {
        var sql = 'UPDATE Usuario SET email = ' + connection.escape(datosUsuario.email) + ', password = ' + connection.escape(datosUsuario.password) +' WHERE username = ' + connection.escape(datosUsuario.username);
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

//Eliminar un usuario por su username
usuarios.deleteUsuario = function(username, callback) {
    if (connection) {
        var sql = 'DELETE FROM Usuario WHERE username = ' + connection.escape(username);
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

module.exports = usuarios;