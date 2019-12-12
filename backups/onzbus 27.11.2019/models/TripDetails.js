const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');

const tripDetail = sequelize.define('tripDetail',{
    tripId :{type:Sequelize.INTEGER,},
    studentId:{type:Sequelize.INTEGER,},
    busId : {type: Sequelize.INTEGER,},
    onBus: {type: Sequelize.BOOLEAN},
    latitude:{type:Sequelize.DECIMAL(20,18),},
    longitude:{type:Sequelize.DECIMAL(20,18) ,},
    scanId:{type:Sequelize.STRING,},
  });
  

  module.exports = tripDetail;