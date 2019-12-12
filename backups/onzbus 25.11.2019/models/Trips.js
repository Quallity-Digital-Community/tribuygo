const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');

const Trip = sequelize.define('trip', {
    busNumber:{type:Sequelize.STRING,},
    busId : {type:Sequelize.INTEGER,},
    supervisorName:{type:Sequelize.STRING,},
    supervisorId : {type: Sequelize.INTEGER,},
    latitude:{type:Sequelize.DECIMAL(20,18),},
    longitude:{type:Sequelize.DECIMAL(20,18) ,},
    hasCompleted:{type:Sequelize.BOOLEAN,},
    schoolId: {type: Sequelize.INTEGER,}
  }); 
  
module.exports = Trip;