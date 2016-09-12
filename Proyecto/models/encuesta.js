/**
 * Created by Geordy on 09-09-2016.
 */

module.exports = function(sequelize, DataTypes){
    var Encuesta = sequelize.define("Encuesta", {
        id_Encuesta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        link: DataTypes.STRING
    },{
        classMethods:{
            associate: function(models) {
                Encuesta.hasMany(models.Encuestado);
                Encuesta.hasOne(models.Proyecto);
            }

        }
    });
    return Encuesta;
};
