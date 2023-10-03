'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    id_alumno: DataTypes.INTEGER,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    correo: DataTypes.STRING
  }, {});
  alumno.associate = function (models) {
    alumno.belongsTo(models.materia,{
      as:'alumnos-materia',
    })
  };
  return alumno;
};