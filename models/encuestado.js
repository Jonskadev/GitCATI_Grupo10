/**
 * Created by Geordy on 09-09-2016.
 */

module.exports = function(sequelize, DataTypes){
    var Encuestado = sequelize.define("Encuestado", {
        rut: {
            type: DataTypes.STRING,
            primaryKey:true
                },
        nombre: DataTypes.STRING,
        telefono: DataTypes.STRING
    },{
        associate: function(models) {
            Encuestado.belongsTo(models.Llamada, {
                onDelete: "CASCADE",
                allowNull: false
            });
            Encuestado.belongsTo(models.Encuesta, {
                onDelete: "CASCADE",
                allowNull: false
            });
        }
    });
    return Encuestado;
};
