const sequelize = require('../config/connection');
const Sequelize  = require('sequelize');

const Student = sequelize.define('student',{
    name:{type:Sequelize.STRING},
    classrm:{type:Sequelize.STRING},
    mobile:{type:Sequelize.STRING},
    address:{type: Sequelize.STRING},
    street:{type: Sequelize.STRING},
    scanId:{type:Sequelize.STRING},
    latitude:{type:Sequelize.DECIMAL(20,18),},
    longitude:{type:Sequelize.DECIMAL(20,18) ,},
    busId: {type: Sequelize.INTEGER,},
    userId:{type:Sequelize.INTEGER,},
    schoolId:{type: Sequelize.INTEGER,},
});

module.exports = Student;