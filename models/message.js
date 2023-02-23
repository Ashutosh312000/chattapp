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
  IsLink: {
    type: Sequelize.BOOLEAN,
    allowNull:false,
  },
  filename: {
    type: Sequelize.STRING,
    allowNull:true,
  },
  filetype: {
    type: Sequelize.STRING,
    allowNull:true,
  },
});

module.exports = Message;
