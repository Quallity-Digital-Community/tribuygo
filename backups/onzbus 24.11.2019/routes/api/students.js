const express = require('express')
const Student = require('../../models/students')
const puppeteer = require('puppeteer');
const router = express.Router();

barcode = () => { 
    return  Math.floor(Math.random() * 10000000000000);
}

const getAllStudents = async({schoolId}) =>{ 
    console.log({msg: "Student list", schoolId: schoolId});
    return await Student.findAll({where :{ schoolId: schoolId}});
};

const getStudent = async obj => {
    console.log("Students details with Id",obj.studentId);
    return await Student.findOne({where: {id: obj.studentId}});
  };

router.post('/addStudent', (req,res) =>{
    const {name, classrm, mobile, address, busId, latitude, longitude, street, schoolId} = req.body;
    //console.log({name : name,  classrm :classrm, mobile :mobile, address:address, street: street, busId:busId, 
      //          latitude:latitude, longitude:longitude, schoolId: schoolId});  
    Student.create({name : name, classrm : classrm, mobile : mobile, address : address, street:street,
       busId : busId, scanId :barcode(), latitude:latitude, longitude:longitude, schoolId: schoolId});
    res.status(200).json({msg: 'student added'});
});

router.get('/getAllStudents/:schoolId', (req, res) =>{   
    getAllStudents(req.params).then(student => res.json(student));  
});

router.get('/editStudent/:id', (req,res)=>{
    let obj = req.params;
    obj.studentId = obj.id;
    delete obj.id;
    console.log("In EditStudent: The students with : ", obj);
    getStudent(obj).then(student => res.json(student));
  });

  router.post('/updateStudent/:id', (req,res)=>{
    const obj = req.params;
    const {name, classrm, mobile, address, busId} = req.body;
    console.log("Before Updating Student: ", req.body, "and request parameters are: ", req.params, "and name is: ", name);
    Student.update({name : name, classrm : classrm, mobile : mobile, address : address, busId : busId},
      {where: {id: obj.id}});
    res.json({msg: "Student has been updated."});
  });

router.get('/deleteStudent/:id', (req,res)=>{
    const obj = req.params.id;
    console.log("Student being deleted: ", obj);
    Student.destroy({where:{id : obj}});
    res.json({msg: "student has been deleted."});
  });

router.get('/printStudent/pdf/:id', (req,res)=>{
    console.log('PDF of student id: ', req.params);
    (async () => {
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
      const page = await browser.newPage();      
      await page.goto('http://localhost:3000/printOne/'+req.params.id);
      console.log("Page URL: ", page.url(), " with student Id: ", req.params.id);
      const buffer = await page.pdf({format: 'A4'});       
      res.type('application/pdf');
      res.send(buffer);        
      browser.close();
    })()
  });

router.get('/exportAll/pdf/:schoolId', (req,res)=>{
    console.log({msg: "All PDF", param: req.params});
    (async () => {
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
      const page = await browser.newPage();      
      await page.goto('http://localhost:3000/pdfGenerate/'+req.params.schoolId);
      console.log("Page URL: ", page.url());
      //page.goto('…', {waitUntil: 'networkidle0'});
      //await page.pdf({path: 'ID Cards.pdf', format: 'A4'})
      const buffer = await page.pdf({format: 'A4'});       
      res.type('application/pdf');
      res.send(buffer);        
      browser.close();
    })()
  });
  
module.exports = router;