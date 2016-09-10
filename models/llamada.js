/**
 * Created by Geordy on 09-09-2016.
 */

module.exports = function(sequelize, DataTypes){
    var Llamada = sequelize.define("Llamada", {
        id_Llamada: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }

    },{
        classMethods: {
            associate: function(models) {
                Llamada.hasMany(models.Encuestado);
                Llamada.belongsTo(models.Estado, {
                    onDelete: "CASCADE",
                    allowNull: false
                });
                Llamada.belongsTo(models.Usuario, {
                    onDelete: "CASCADE",
                    allowNull: false
                });
            }

    }

    });
    return Llamada;
};
