const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');


const School = sequelize.define('school', {
    schoolName:{type: Sequelize.STRING},
    address:{type: Sequelize.STRING},
    contactPerson:{type: Sequelize.STRING},
    phone:{type:Sequelize.STRING},
    
});

module.exports = School;
