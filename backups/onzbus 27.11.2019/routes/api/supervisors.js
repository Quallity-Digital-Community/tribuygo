const express = require('express');
const userModel = require('../../models/users.js');

const router = express.Router();

const getSupervisor = async({schoolId}) => {
    console.log({msg:"sup", schoolId: schoolId});
    return await userModel.findAll({where :{roleId:1, schoolId: schoolId}});
}

const getUser = async obj => {
    return await userModel.findOne({where: obj,
    });
  };

router.post('/registerSupervisor', (req, res) => {
    console.log(req.body);
    const {name, email, password, mobile, schoolId}=  req.body;
    userModel.create({name: name, email:email, password:password, phone:mobile, roleId: 1, schoolId:schoolId});
    res.json({msg : "Supervisor has been added successfully"});
  
  });

router.get('/getAllSupervisor/:schoolId', (req, res) => {
    console.log(req.params);
    getSupervisor(req.params).then( supervisors => res.json(supervisors))
});

router.get('/editUser/:id', (req,res) =>{
    let obj = req.params;
    console.log({User: obj});
    getUser({id:obj.id}).then(user => res.json(user));
  });

router.post('/updateUser/:id', (req,res) => {
    const obj = req.params;
    const {name, email, password, mobile, } = req.body;
    //console.log("In update User method.");
    //console.log({obj : obj}, {body: {name, email, password, mobile}});
    userModel.update({name : name, email, password:password, phone : mobile},
         {where: {id: obj.id}});
    res.json({msg: "User updated"});
});


router.get('/deleteSupervisor/:id', function(req,res){
    const obj = req.params.id;
    userModel.destroy({where:{id : obj}});
    res.json({msg: "supervisor has been deleted."});
  });

module.exports = router; 