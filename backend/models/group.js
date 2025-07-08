'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init({
    sender: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
const Group = sequelize.define("Group", {
  name: DataTypes.STRING
});

const GroupUser = sequelize.define("GroupUser", {
  user_id: DataTypes.INTEGER,
  group_id: DataTypes.INTEGER
});

const Message = sequelize.define("Message", {
  content: DataTypes.TEXT,
  user_id: DataTypes.INTEGER,
  group_id: DataTypes.INTEGER,
});