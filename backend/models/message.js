"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "Sender",
      });

      Message.belongsTo(models.Group, {
        foreignKey: "group_id",
        as: "Group",
      });
    }
  }

  Message.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // null ได้ถ้าเป็นข้อความส่วนตัว
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "Messages",
    }
  );

  return Message;
};
