const express = require('express');
const School = require('../../models/schools.js');
const User = require('../../models/users.js');
const sequelize = require('../../config/connection');

const router = express.Router();
/*
User.belongsTo(School);
School.hasMany(User); 

School.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials? for School Table'));


const seedSchool = () => {
    return Promise.all([
        School.create({ schoolName:"Al Yasat", address:"Abu Dhabi", contactPerson:"Usman",
         phone:"01227689"}),
        School.create({ schoolName:"Virginia School", address:"Dubai", contactPerson:"Hossam",
         phone:"065245431"})
      ]).catch(error => console.log(error));
};

sequelize.sync().then(seedSchool());

/////////////////////////////////////////////////////////////////////////////
User.sync({alter:true}).then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials for User Table'));


const seedUser = () => {
    return Promise.all([
      User.create({ name:"QDC Admin", password:"qdcmedia567", email:"admin@qdc.ae",
       phone:"0972198721", roleId:"4" , schoolId:'1'}),
        User.create({ name:"Supervisor1", password:"sup1", email:"sup1@email.com",
         phone:"0972198721", roleId:"1",platform:"iOS", schoolId:'2' }),
        User.create({ name:"Supervisor2", password:"sup2", email:"sup2@email.com",
         phone:"0972198721" , roleId:"1",platform:"android", schoolId:'1'})      
    ]).catch(error => console.log(error));
  };
  
  sequelize.sync().then(seedUser());
*/
module.exports = router; 
