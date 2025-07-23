"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Message, {
        foreignKey: "group_id",
        as: "Messages",
      });
    }
  }

  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "Groups",
    }
  );

  return Group;
};
