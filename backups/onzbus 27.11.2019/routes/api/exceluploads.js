var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const express = require('express')
const router = express.Router();
const Bus = require('../../models/busses.js');
const Student = require('../../models/students')
const User = require('../../models/users')
const connection = require('../../config/mysql-connection');


function getBusId({busNumber}){
    //console.log({busNumber: busNumber});
    var sql = "Select id from buses WHERE busNumber = '"+busNumber+"'";

    // confirm password
    connection.query(sql , function (err, result) {
    if (err) throw err;
    console.log(result[0]['id']);
    return result[0]['id'];   
        })
}

function getBusIdandcreate({resultdata,schoolId}){
    //console.log({busNumber: busNumber});
    // for(var i = 0; i < result.length; i++){
        busNumber = resultdata.busnumber
    // }
    var sql = "Select id from buses WHERE busNumber = '"+busNumber+"'";

    // confirm password
    connection.query(sql , function (err, result) {
    if (err) throw err;
    console.log(result[0]['id']);
    var idret = result[0]['id']

    console.log("idret",idret);
    console.log(resultdata);
    console.log(resultdata.name);
    Student.create({name: resultdata.studentname, 
        classrm: resultdata.classroom,
        mobile:resultdata.mobile,
        address: resultdata.address, 
        scanId:barcode(), 
        busId: idret,
        schoolId:schoolId});
    // return result[0]['id'];   
        })

}

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  });
  var upload = multer({ //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');
  /** API path that will upload the files */
  router.post('/uploadBus/:schoolId', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                for(var i = 0; i < result.length; i++){
                  Bus.create({busNumber:result[i].busnumber, schoolId:req.params.schoolId});
                }
                //addStudents(result);
                //console.log(JSON.stringify(result, null, 2));
                res.json({error_code:0,err_desc:null, data: result});
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corrupted excel file"});
        }
    })
  });
  
  router.post('/uploadStudent/:schoolId', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                for(var i = 0; i < result.length; i++){
                    //console.log(result[i].busnumber);    
                //    var busId = getBusId({busNumber: result[i].busnumber});
                getBusIdandcreate({resultdata:result[i],schoolId:req.params.schoolId})
                    // console.log({msg:"route" ,busId: busId});
                    // if (typeof(busId) !== 'undefined' ){
                    //     console.log("busid",busId)
                        

                    // }else{
                    //     console.log("Undefined")
                    // }
                
                                  
                }
                //addStudents(result);
                //console.log(JSON.stringify(result, null, 2));
                res.json({error_code:0,err_desc:null, data: result});
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corrupted excel file"});
        }
    })
  });

  router.post('/uploadSupervisor/:schoolId', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                for(var i = 0; i < result.length; i++){
                  User.create({name:result[i].name, email: result[i].name,
                     password: result[i].password, phone: result[i].contactnumber, 
                     schoolId:req.params.schoolId, roleId: 1});
                }
                //addStudents(result);
                //console.log(JSON.stringify(result, null, 2));
                res.json({error_code:0,err_desc:null, data: result});
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corrupted excel file"});
        }
    })
  });



module.exports = router;