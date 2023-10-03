'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});


  profesor.associate = function (models) {
    profesor.belongsTo(models.materia, {
      as: 'Profesor-materia',
      foreignKey: 'id_materia'
    })
  };
  return profesor;
};