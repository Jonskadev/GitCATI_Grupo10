/**
 * Created by Geordy on 09-09-2016.
 */

module.exports = function(sequelize, DataTypes){
    var Proyecto = sequelize.define("Proyecto", {
        id_Proyecto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
    },{
        classMethods:{
            associate: function(models) {
                Proyecto.belongsTo(models.Encuesta, {
                    onDelete: "CASCADE",
                    allowNull: false
                });
            }
        }

    });
    return Proyecto;
};