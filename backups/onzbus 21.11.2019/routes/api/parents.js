const express = require('express');
const userModel = require('../../models/users.js');

const router = express.Router();

const getAllParent = async({schoolId}) => {
    return await userModel.findAll({where :{roleId:2, schoolId:schoolId}});
}

router.get('/getAllParent/:schoolId', (req,res) =>{
    getAllParent(req.params).then(parent => res.json(parent));
});

module.exports = router;