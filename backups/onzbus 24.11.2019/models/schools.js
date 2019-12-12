const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');


const School = sequelize.define('school', {
    schoolName:{type: Sequelize.STRING},
    address:{type: Sequelize.STRING},
    email : {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    contactPerson:{type: Sequelize.STRING},
    contactNumber:{type:Sequelize.STRING},
    mobileNumber : {type:Sequelize.STRING},
    roleId : {type: Sequelize.INTEGER}
});

module.exports = School;
