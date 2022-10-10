const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    },
    profile: {
      type: DataTypes.ENUM(["Admin", "Client"]),
      defaultValue: "Client",
    },
    visited: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
