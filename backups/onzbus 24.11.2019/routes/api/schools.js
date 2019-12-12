const express = require('express');
const schoolModel = require('../../models/schools.js');
const userModel = require('../../models/users.js');
const router = express.Router();

const connection = require('../../config/mysql-connection');

const addSchool = async obj => {
    return await schoolModel.create(obj);
}

const addUser = async ({ email, password, contactPerson, mobileNumber, roleId, schoolId}) =>{
    console.log({log: "Add user method", email, schoolId});
    return await userModel.create({name: contactPerson, email: email, password: password,
                   phone: mobileNumber, roleId: roleId, schoolId:schoolId });
}

router.get('/test', (req, res) => res.json({ msg: 'School Works' }));

router.post('/registerSchool', (req, res) => {
    //console.log(req.body);
    const obj = req.body;
    const { email, password, contactPerson, mobileNumber, roleId} = req.body;
    addSchool(obj)
    .then(school => {
        //console.log(school)
        //console.log("School Object: ",school.dataValues.id)
        const schoolId = school.dataValues.id;
        console.log(schoolId)
        console.log(school.dataValues.roleId)
        addUser({ email, password, contactPerson, mobileNumber, roleId, schoolId})
    })
    .then(res.json({msg: "School has been registered successfully"}))
});


// @route   get api/shcools/get_school_list
// @desc    User will verify on this route
// @access  Public
router.get('/get_school_list', (req, res) => {
    var sql = "SELECT id, schoolName, address, email, contactPerson,contactNumber,mobileNumber, roleId from  schools";
    // confirm password
    connection.query(sql , function (err, result) {
    if (err) throw err;
        return res.status(200).json(result);
    });
})

module.exports = router; 