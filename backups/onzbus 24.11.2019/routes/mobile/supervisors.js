const express = require('express')
const Bus = require('../../models/busses')
const Trip = require('../../models/Trips')
const Student = require('../../models/students')
const notificationLog = require('../../models/notificationLog')


const router = express.Router();

const getAllBuses = async({schoolId}) =>{
    console.log({msg: "buss for school", schoolId : schoolId});
    return await Bus.findAll({where :{ schoolId: schoolId}});
};

const startTrip = async ({busNumber, busId, supervisorName, supervisorId, longitude, latitude, hasCompleted, schoolId}) =>{
        return await Trip.create({ busNumber: busNumber, busId:busId, 
                     supervisorName: supervisorName, supervisorId:supervisorId,
                      longitude:longitude, latitude:latitude, 
                      hasCompleted:hasCompleted, schoolId: schoolId});
};

const getBusstudents = async obj => {
        //console.log("Students of bus",obj);
        return await Student.findAll({where: {busId: obj.busId}});
};

const getStudent = async obj => {
        console.log("Students details with Id",obj.studentId);
        return await Student.findOne({where: {id: obj.studentId}});
};

const checkTime = async (original, secDestination) =>{
        var destinations = [];  
        var origins = [];
        secDestination.forEach(function(element){
          const imp = element.join(',');
          destinations.push(imp);
        })
    
        original.forEach(function(element){
          const imp = element.join(',');
          origins.push(imp);
        })
        //console.log("Origins ", origins, "\nDestinations : ", destinations);
        distance.key('AIzaSyBgG9can04sw-SCdWIcWTgnD_rlUoiZaIk');
    
        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if(!distances) {
                return console.log('no distances');  
            }
            if (distances.status == 'OK') {            
                var origin = distances.origin_addresses[0];
                var destination = distances.destination_addresses[0];
                if (distances.rows[0].elements[0].status == 'OK') {
                    //console.log("console check : ", distances.rows[0].elements[j].duration.value);
                    //var distance = distances.rows[i].elements[j].distance.text;
                    var time = distances.rows[0].elements[0].duration.value;
                    //console.log("Time calculated is : ", time);
                    return time;
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        
            
      });
};

const getstudentWithScanId = async obj => {
    console.log("Students details with Scan Id ",obj.scanId);
    return await Student.findOne({where: {scanId: obj.scanId}});
  };
  
const  getParent = async ({userId}) =>{
    console.log("Searching for parent with parent Id: ", userId );
    return User.findOne({where:{id:userId}});
};

function sendAndroidNotification(userId, deviceId, name, isBoarding){
    //console.log("In Android Notify with ID: ",deviceId);
    var myClient = new OneSignal.Client({      
      userAuthKey: 'OTIyZDVlYmItNDRiZi00NzQ1LWIxNGYtNWM4YzQxZDI0MTBj',      
      app: { appAuthKey: 'NWM1ZjE2MWItZGUwNy00Mjk1LWJjYmUtOTI5MmExM2MwYTc3', 
             appId: '45cbee29-1355-4a82-9f9d-0522ad9022f5' }      
  });      
  console.log(userId, ": ", name,  ": ", isBoarding); 
  if(isBoarding){
      var firstNotification = new OneSignal.Notification({      
      contents: {      
        en:  name+ " has boarded the bus.",            
      },    
      include_player_ids: [deviceId]    
      }); 
      console.log("Notification sent is: ", firstNotification);   
      notificationLog.create({userId: userId, deviceId: deviceId, desc:name +" has boarded the bus" });         
  }    
  else if(!isBoarding){
    var firstNotification = new OneSignal.Notification({      
      contents: {      
        en:  name+ " has been dropped off at home.",            
      },    
      include_player_ids: [deviceId]    
      });      
      //console.log("Content is : ",firstNotification);
      notificationLog.create({userId: userId, deviceId: deviceId, desc:name +" has been dropped at home" });       
  }  // var o = {p: 42, q: true};
  //var {p: foo, q: bar} = o;
  // Add a new target after creating initial notification body    
  //firstNotification.postBody["include_player_ids"].push[deviceId]        
  myClient.sendNotification(firstNotification, function (err, httpResponse,data) {      
     if (err) {      
         console.log('Something went wrong...');      
     } else {      
         console.log(data);      
     }
  });
}

function sendiOSNotification(userId, deviceId, name, isBoarding, readCount){
    console.log("in Send iOS Notification", userId," and Read count is : ", readCount ); 
    let options = {
      token: {
        key: "AuthKey_K326SA3RQM.p8",
        keyId: "K326SA3RQM",
       teamId: "UC25239KDB"
     },
     production: true
   };
   let apnProvider = new apn.Provider(options);
   let deviceToken = deviceId;
   //console.log('The device Id is: ', deviceId);
   let notification = new apn.Notification();
   notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
   notification.badge = readCount;
   notification.sound = "ping.aiff";
   if(isBoarding){
      notification.alert = name + " has boarded the Bus";
      notificationLog.create({userId: userId, deviceId: deviceId, desc:name +" has boarded the bus" });
      readCount++;
      User.update({readCount:readCount}, {where:{id:userId}});
      //console.log("Updated User with id: ", userId, " readcount is now: ", readCount);
   }else{
    notification.alert = name + " has been dropped off at home";
    notificationLog.create({userId: userId, deviceId: deviceId, desc:name +" has been dropped at home" }); 
    readCount++;
    User.update({readCount:readCount}, {where:{id:userId}});      
  }
   notification.payload = {'messageFrom': 'OnzBus'};
   
   notification.topic = "qdc.onzbus";
   
   
   apnProvider.send(notification, deviceToken).then( result => {
       console.log(result);
   });
   apnProvider.shutdown();
  }

router.get('/getBusList/:schoolId', (req, res) =>  {
    
    console.log('Accessing All Busses');

    getAllBuses(req.params).then(bus => res.json(bus));
  });

router.post('/startTrip', (req,res) =>{
    const {busNumber, busId, supervisorName,  supervisorId, longitude, latitude, hasCompleted } = req.body;
    //console.log('Starting a new Trip');
    console.log('The trip is starting with bus ',busNumber ,' and Supervisor ', supervisorName);
    // Insert trip Table in table
    startTrip({busNumber, busId, supervisorName, supervisorId, longitude, latitude, hasCompleted}).then ( trip =>
      res.json({trip}) );  
  });

router.post('/endTrip', (req,res) => {
    const {tripId } = req.body;
    //console.log('Trip ' , tripId, ' is ENDING with bus ',busId ,' and Supervisor ', supervisorId);
    Trip.update({hasCompleted:'1'}, {where:{id:tripId}});
    res.json({msg :'Trip has ended. Have a good Day'});
  }); 

router.post('/getStudentofBus', (req, res) =>{
    let obj = req.body;
    //console.log("Recieved a request from shruti",obj);
    getBusstudents(obj).then(student =>
      res.json({ student, msg: 'Bus has above registered children' })
    );
  }); 

router.post('/getStudentDetail', (req, res) => {
    let obj = req.body;
    console.log(obj);
    getStudent(obj).then(student =>
      res.json({ student, msg: 'Student detail' })
    );
  });

router.post('/sendBusLocation', async (req,res)=>{
    const{tripId, longitude, latitude} = req.body;
    console.log({tripId: tripId, msg:" New COORDS", longitude: longitude, latitude: latitude});
    updateLocation({tripId, longitude, latitude}).then(function(trip){
      getBusId({tripId}).then(function(bus){
        //console.log("This trip has busId: ", bus.busId);
        let obj = {};
        let key  ="busId";
        obj[key] = bus.busId;
        //console.log("Value of obj: " , obj);
        getBusstudents(obj).then(function(student){
          //console.log("Fetching students of bus: ", student[1].name);
          const forLoop = async _ =>{
          let origins = [[latitude ,longitude]];
          let destinations =[];
          for(var i = 0; i < student.length; i++)
            { 
              destinations = [[student[i].latitude ,student[i].longitude]];
              const tyme = await checkTime(origins, destinations);              
              console.log("Time needed is : ", tyme);
            }
          }
          console.log("\nITERATION \n");
          //var tyme = checkTime(origins, destinations);  
        })      
      })
    }).then (trip =>
      res.json({msg:"Location updated"}) );  
  });

router.post('/studentOffBoarding', (req,res)=>{
    const obj = req.body;
    getstudentWithScanId(obj).then(function(student){    
      getParent(student.userId).then(function(parent){
            //console.log("Platform of parent is : ", parent.platform," : with parent name: ", parent.name);
            if(parent.platform == 'android')
            {
              sendAndroidNotification(parent.id, parent.deviceId, student.name,false);
            }
            else if(parent.platform == 'iOS'){
              sendiOSNotification(parent.id, parent.deviceId, student.name, false, parent.readCount);
            }
            else{console.log("No specific platform found. ");}
          });
          //console.log("Student is getting off the bus",{barcode : student.scanId} );
          tripDetail.update({onBus: false}, {where:{tripId:obj.tripId, scanId:obj.scanId}});
          res.json({msg:'Student is getting off the bus and parent has been notified.'});
    });
  });

router.post('/studentOnBoarding',(req,res)=>{
    const obj = req.body;
    //console.log("In student On boarding : ", obj);
    getstudentWithScanId(obj).then(function(student){
      console.log("Student is registered in bus: ", student.busId, "and current busId is : ", obj.busId);
      if(student.busId == obj.busId){
          getParent(student.userId).then(function(parent){
            console.log("Platform of parent is : ", parent.platform," : with parent name: ", parent.name, ": read Count: ", parent.readCount);
            if(parent.platform == 'android')
            {
              sendAndroidNotification(parent.id, parent.deviceId, student.name,true)
            }
            else if(parent.platform == 'iOS'){
              sendiOSNotification(parent.id, parent.deviceId, student.name, true, parent.readCount);
            }
            else{console.log("No specific platform found. ");}
          });
          tripDetail.create({tripId : obj.tripId, busId: obj.busId, studentId: student.id, onBus:true, latitude: student.latitude, longitude: student.longitude, scanId: student.scanId});
          res.status(200).json({msg: 'Student has been marked on bus and notification sent to Parent'});
      }
      else{res.status(200).json({err: 'Student is not registered for this bus. Correct bus number is: ', busNumber: student.busId});}
    });  
  });
  
  
module.exports = router;