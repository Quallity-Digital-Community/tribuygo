const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');


const User = sequelize.define('user', {
    email:{type:Sequelize.STRING,},
    name: { type: Sequelize.STRING, },
    password: {type: Sequelize.STRING, },
    phone:{type:Sequelize.STRING},
    platform:{type:Sequelize.STRING},
    deviceId:{type:Sequelize.STRING},
    roleId:{type:Sequelize.INTEGER},
    readCount: {type:Sequelize.INTEGER, defaultValue: '1',}
});

module.exports = User;
 
  
