const express = require('express');
const userModel = require('../../models/users.js');
const Student = require('../../models/students')
const Trip = require('../../models/Trips')
const User = require('../../models/users')
const notificationLog = require('../../models/notificationLog')
const Bus = require('../../models/busses')

const router = express.Router();

const getAllParent = async({schoolId}) => {
    return await userModel.findAll({where :{roleId:2, schoolId:schoolId}});
}

const addStudentToParent = async({parentId, scanId}) =>{
    console.log("Parent with id ", parentId, " wishes ", scanId);
    Student.findOne({where:{scanId:scanId}}).then(student => {
      console.log(student)
    })
    return await Student.update({userId:parentId}, {where:{scanId:scanId}});
 };

 const getLocation = async obj =>{
    var time = new Date();
    console.log('Sending new Location for Bus: ', obj.busId, "to parent at: ",  time);
    return await Trip.findOne({where: {busId:obj.busId, hasCompleted :'0' }});
  };

  const getStudent = async obj => {
    console.log("Students details with Id",obj.studentId);
    return await Student.findOne({where: {id: obj.studentId}});
  };

  const getChildList = async obj =>{
    console.log('Children of Parent',obj );
    return await Student.findAll({where: {userId: obj.parentId},
      include:[{
        model: Bus
      }]
    });
  };

  const getNotify = async({userId}) =>{
    return await notificationLog.findAll({where: {userId : userId}});
  };

router.get('/getAllParent/:schoolId', (req,res) =>{
    getAllParent(req.params).then(parent => res.json(parent));
});

router.post('/addChild',(req, res) => {
    const {parentId, scanId} = req.body;
    console.log("Parent adding child", scanId);
    addStudentToParent({parentId, scanId}).then ( student =>
      res.json({student, msg:"Child has been added Successfully"}) );  
  });

router.post('/deleteChild', (req, res) => {
    const {studentId} = req.body;
    console.log("Removing Child from Parent : ", studentId);
    Student.update({userId:'1'}, {where:{id:studentId}});
    res.json({msg: "Child has been removed"});
});

router.post('/getChildList', (req,res) =>{
    let obj = req.body;
    console.log('Getting Child for Parent', obj);
    getChildList(obj).then(student =>{
      //console.log(student[0].bus.busNumber);
      
      res.json({student,  msg:"Following Students are registered to Parent"});
    });
});

router.post('/getChildLocation', (req,res)=>{ 
    const obj = req.body;
    console.log(obj);
    getLocation(obj).then(function(trip){
      //Object.keys(obj).length === 0 && obj.constructor === Object
      if (trip === null){
        return res.json({err : "Currently your child is not in bus."});
      }
      else {
      console.log('Bus Location: latitude: ', trip.latitude, " : longitude: ", trip.longitude);
      getStudent(obj).then(student => res.status(200).json({student,trip}))  
      }
    })
  });

router.post('/clearNotifyCount', (req,res) =>{
    const obj = req.body;
    User.update({readCount:'1'}, {where:{id:obj.userId}});
    res.status(200).json({msg: "Cleared"});
});

router.post('/getNotification', (req,res) =>{
    const{userId} = req.body;
    getNotify({userId}).then(notify => res.json({notify}))
  });
module.exports = router;