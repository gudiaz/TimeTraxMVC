'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('Company', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: DataTypes.STRING, allowNull: true},
      address: {type: DataTypes.STRING, allowNull: true},
      city:{type: DataTypes.STRING, allowNull: true},
      state: {type: DataTypes.STRING, allowNull: true},
      zip: {type: DataTypes.STRING, allowNull: true},
      contactname: {type: DataTypes.STRING, allowNull: true},
      contactphone: {type: DataTypes.STRING, allowNull: true},
      contactemail: {type: DataTypes.STRING, allowNull: true, validate: {isEmail: true}}
  },
  {
    paranoid: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //Company.hasMany(models.Job, {foreignKey: 'jobId'});
        //Company.hasMany(models.Schedule, {foreignKey: 'scheduleId'});
       }
    }
  });
  return User;
};