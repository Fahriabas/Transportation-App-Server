'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User, {foreignKey: "AuthorId"})
      Vehicle.belongsTo(models.Type, {foreignKey: "TypeId", onDelete: 'CASCADE'})

    }
  }
  Vehicle.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.STRING,
    TypeId: DataTypes.INTEGER,
    AuthorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};