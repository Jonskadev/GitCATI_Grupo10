/**
 * Created by Geordy on 09-09-2016.
 */

module.exports = function(sequelize, DataTypes){
    var Usuario = sequelize.define("Usuario", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        permiso: DataTypes.BOOLEAN
    },{
        classMethods:{
            associate: function(models) {
                Usuario.hasMany(models.Llamada)
            }
        }

    });
    return Usuario;
};
