"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, {
        foreignKey: "user_id",
        as: "Messages",
      });

      User.belongsToMany(models.Group, {
        through: models.GroupUser,
        foreignKey: "user_id",
        otherKey: "group_id",
        as: "Groups",
      });
    }
    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      sender: DataTypes.STRING,
      content: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.getSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user, options) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
