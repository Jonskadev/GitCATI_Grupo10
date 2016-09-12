/**
 * Created by Geordy on 09-09-2016.
 */

module.exports = function(sequelize, DataTypes){
    var Estado = sequelize.define("Estado", {
        state_name: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    },{
        classMethods:{
            associate: function(models) {
                Estado.hasMany(models.Llamada);
            }
        }

    });
    return Estado;
};