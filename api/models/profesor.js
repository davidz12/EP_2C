'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  profesor.associate = function(models) {
    // associations can be defined here
  };
  return profesor;
};