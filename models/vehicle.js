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
      Vehicle.belongsTo(models.User, {foreignKey: "authorId"})
      Vehicle.belongsTo(models.Type, {foreignKey: "typeId", onDelete: 'CASCADE'})
      Vehicle.hasMany(models.Bookmark, {
        foreignKey: 'VehicleId'
      })
    }
  }
  Vehicle.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "name cannot be empty"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "description cannot be empty"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "imgUrl cannot be empty"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: false,
        notEmpty:{
          args: true,
          msg: "location cannot be empty"
        }

      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        min: {
          args: [100000],
          msg: "price min 100000"
        }
      }
    },
    typeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Types",
        key: "id"
      },
      onDelete: 'CASCADE'
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};