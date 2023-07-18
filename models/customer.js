'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsToMany(models.Vehicle , {
        through: models.Bookmark,
        foreignKey: 'CustomerId'
      })
      Customer.hasMany(models.Bookmark, {
        foreignKey: 'CustomerId'
      })
    }
  }
  Customer.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer, options) => {
    if(customer.password){
      customer.password = hashPassword(customer.password)
    }
    customer.role = 'customer'
  })
  return Customer;
};