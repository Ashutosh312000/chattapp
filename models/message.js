const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Message = sequelize.define('message', { 
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Message: {
    type: Sequelize.STRING,
    allowNull:false,
  },
});

module.exports = Message;
