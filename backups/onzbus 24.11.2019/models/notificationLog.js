const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');

const notificationLog = sequelize.define('notificationLog', {
    userId:{type: Sequelize.INTEGER, },
    desc:{type: Sequelize.STRING,},
    deviceId:{type : Sequelize.STRING,},
  });
  
module.exports = notificationLog;
