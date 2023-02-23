const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const User = sequelize.define('user', { 
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING,
    allowNull:false,
  },
  Phone_No: {
    type: Sequelize.STRING,
    allowNull:false,
    unique: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull:false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull:false,
  },
});

module.exports = User;
