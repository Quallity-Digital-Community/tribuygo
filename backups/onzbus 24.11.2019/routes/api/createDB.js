const express = require('express');
const School = require('../../models/schools.js');
const User = require('../../models/users.js');
const Bus = require('../../models/busses.js');
const Student = require('../../models/students');
const Trip = require('../../models/Trips');
const tripDetail = require('../../models/TripDetails')
const notificationLog = require('../../models/notificationLog')
const router = express.Router();


School.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials? for School Table'));

Bus.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials for BUSSES'));

User.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials for User Table'));

Student.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials for Student'));

Trip.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials for Student'));

tripDetail.sync().then(() => console.log(''))
.catch(err => console.log('did you enter wrong database credentials for Student'));

 
notificationLog.sync().then(() => console.log(''))
  .catch(err => console.log('did you enter wrong database credentials? for trip Detail Table'));

User.belongsTo(School);
School.hasMany(User); 

Bus.belongsTo(School);
School.hasMany(Bus);

Student.belongsTo(School);
School.hasMany(Student);

Student.belongsTo(Bus);
Bus.hasMany(Student);

Student.belongsTo(User);
User.hasMany(Student);

Trip.belongsTo(School);
School.hasMany(Trip);

Trip.belongsTo(Bus);
Bus.hasMany(Trip);

tripDetail.belongsTo(Trip)
Trip.hasMany(tripDetail)

tripDetail.belongsTo(User)
User.hasMany(tripDetail)



module.exports = router; 
