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

User.belongsTo(School, {foreignKey: 'schoolId'});
School.hasMany(User, {foreignKey: 'schoolId'}); 

Bus.belongsTo(School, {foreignKey: 'schoolId'});
School.hasMany(Bus, {foreignKey: 'schoolId'});

Student.belongsTo(School, {foreignKey: 'schoolId'});
School.hasMany(Student),{foreignKey: 'schoolId'};

Student.belongsTo(Bus, {foreignKey: 'busId'});
Bus.hasMany(Student, {foreignKey: 'schoolId'});

Student.associate = (models) => {
  // associations can be defined here
  Student.belongsTo(models.Bus, { foreignKey: 'busId' });
};



Student.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Student, {foreignKey: 'userId'});

Trip.belongsTo(School, {foreignKey: 'schoolId'});
School.hasMany(Trip, {foreignKey: 'schoolId'});

Trip.belongsTo(Bus, {foreignKey: 'busId'});
Bus.hasMany(Trip, {foreignKey: 'busId'});

tripDetail.belongsTo(Trip, {foreignKey: 'tripId'})
Trip.hasMany(tripDetail, {foreignKey: 'tripId'})

tripDetail.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(tripDetail, {foreignKey: 'userId'})



module.exports = router; 
