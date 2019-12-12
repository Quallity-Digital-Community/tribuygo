const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');

const Bus = sequelize.define('bus',{
    busNumber:{type:Sequelize.STRING,},
    schoolId:{type:Sequelize.INTEGER,},
});

module.exports = Bus;