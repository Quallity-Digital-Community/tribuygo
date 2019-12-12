const express = require('express');
const busModel = require('../../models/busses.js');
const Trip = require('../../models/Trips')

const router = express.Router();

const addNewBus = async obj =>{
    console.log("before inserting", obj);
    return await busModel.create(obj);
  };

const getAllBuses = async({schoolId}) =>{ 
    //console.log({msg:"Bus", schoolId: schoolId});
    return await busModel.findAll({where :{schoolId: schoolId}});
};

const getBus = async obj => {
    return await busModel.findOne({where: obj,
    });
  };

  const getActiveTrips = async({schoolId}) => {
    return await Trip.findAll(
                  {where :{hasCompleted:false, schoolId:schoolId}
                });
  }

router.get('/editBus/:id', (req,res) =>{
    let obj = req.params;
    //console.log({Bus: obj});
    getBus({id:obj.id}).then(user => res.json(user));
  });

router.post('/updateBus/:id', (req,res) => {
    const obj = req.params;
    const {busNumber} = req.body;
    console.log({params: req.params, body: req.body})
    busModel.update({busNumber : busNumber},
         {where: {id: obj.id}});
    res.json({msg: "bus updated"});
});

router.post('/addBusRoute', (req,res) =>{
    const obj = req.body;
    console.log('Server: Adding a bus', obj);
    addNewBus(obj).then(bus => res.json({bus:bus.busNumber,  msg :"Bus has been added in Database"}));
  
  });

router.get('/getBusListTest/:schoolId', (req, res) => {
    
    console.log('Accessing All Busses', req.params);
    getAllBuses(req.params).then(bus => res.json(bus));
  });

router.get('/deleteBus/:id', function(req,res){
    //console.log('Have reached method');
    const obj = req.params.id;
    //console.log("Bus being deleted: ", obj);
    busModel.destroy({where:{id : obj}});
    res.json({msg: "bus has been deleted."});
  });

router.get('/getActiveTrips/:schoolId', (req,res) =>{
    //console.log({msg:"Active trips", schoolId:req.params});
    getActiveTrips(req.params).then(trips =>res.json(trips));
  });

module.exports = router; 