'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});


  materia.associate = function (models) {
    materia.belongsTo(models.carrera, {
      as: 'Materia-Carrera',
      foreignKey: 'id_carrera'
    })
  };

  materia.associate = function (models) {
    materia.hasMany(models.alumno,{
      as:'alumno-materia',
      foreignKey:'id_alumno'
    })
  }
  return materia;
};