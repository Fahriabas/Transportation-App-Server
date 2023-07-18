'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const { hashPassword } = require('../helpers/bcrypt');
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Type,{
        through: models.Vehicle,
        foreignKey: "authorId",
        otherKey: "typeId",
        onDelete: 'CASCADE'
      })

      User.hasMany(models.Vehicle, {foreignKey: "authorId"})
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isUnique :true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail : true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true,
        min: 5
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    if(user.password){
      user.password = hashPassword(user.password)
    }
  })
  return User;
};