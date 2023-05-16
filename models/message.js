const db = require("../db/sequelize").sequelize;
const sequelize = require("sequelize");
const Message = db.define(
  "message",
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: sequelize.STRING,
      required: true,
    },

    Message_DateTime: {
      type: sequelize.STRING,
      required: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,

    hooks: {
      beforeCreate: async function (Message) {
        Message.dataValues.id = null;
      },
    },
  }
);
module.exports = Message;
