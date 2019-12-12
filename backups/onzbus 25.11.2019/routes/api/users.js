const express = require('express');
const userModel = require('../../models/users.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const router = express.Router();
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const connection = require('../../config/mysql-connection');


let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'qdc0987';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
const getAllUsers = async () => {
    return await userModel.findAll();
  };

const getUser = async obj => {
    return await userModel.findOne({where: obj,
    });
};  

const createUser = async ({ email, name, password, phone, roleId, deviceId }) => {
  return await userModel.create({ email, name, password, phone, roleId, deviceId });
};

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.get('/users', (req, res) =>{
    getAllUsers().then(user => res.json(user));
});

router.post('/signIn', async (req, res, next) => {
        const { email, password, deviceId, platform } = req.body;
        console.log(req.body);
        //console.log(password);
        if (email && password) {
            let user = await getUser({ email: email });
            if (!user) {
            res.status(401).json({ msg: 'No such user found' });
            }
            if (user.password === password) {
            // from now on we'll identify the user by the id and the id is the 
            // only personalized value that goes into our token
            let payload = { id: user.id };
            userModel.update({deviceId:deviceId, platform: platform}, {where:{id:user.id}});
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.status(200).json({ msg: 'ok', token: token, roleId: user.roleId, userId: user.id, name: user.name, schoolId: user.schoolId });
            } else {
            res.status(401).json({ msg: 'Password is incorrect' });
            }
        }
});

router.post('/signUp', (req, res, next) => {
  const { email ,name, password, phone, roleId, deviceId } = req.body;
  console.log("user email is ", email);
  createUser({ email, name, password, phone, roleId, deviceId }).then(user =>
    res.json({ user, msg: 'account created successfully' })
  );
});
// @route   get api/users/forgot_password_request
// @desc    User will verify on this route
// @access  Public

router.post('/forgot_password_request', (req, res) => {

    // Get the email address 
    const { email } = req.body;
    const errors = {};

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(email).toLowerCase())) {

        errors.email = 'Please enter valid email address';

        return res.status(400).json(errors);
    }

    const users = req.body
    const subject = 'Password change request';
    const text = 'Please check the link below to change your password';
    const content = `<a href = "http://3.135.8.79:3000/change_password/${req.body.email}">Change password</a>`

    sendmail(req.body, subject, text, content, 'info@onzbus.com').catch(console.error); 

    return res.status(200).json({success: 'ok'})

})

// @route   POST api/users/change_password
// @desc    User will verify on this route
// @access  Public
// @parmas string email, string timestamp, string request_id, string password, string confirm_password

router.post('/change_password', (req, res) => {

    // get password 
    const {email, password, confirm_password} = req.body;

    // Email address is required to update the password 


    if(typeof password === 'undefined' || password.length < 1) {

        return res.status(401).json({password: 'Password must be leat one char length.'});
    }

    if(typeof confirm_password === 'undefined' || password !== confirm_password) {

        return res.status(401).json({password: 'Both password did not matched.'});
    }

    // check the email and password 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(email).toLowerCase())) {

        return res.status(401).json({email: 'Please enter valid email address'});
    }

    var sql = "UPDATE users SET password = '"+password+"' WHERE email = '"+email+"'";

    // confirm password
    connection.query(sql , function (err, result) {
    if (err) throw err;

    // Send mail 
    const users = req.body
    const subject = 'Password changed sucessfully.';
    const text = 'Password changed sucessfully.';
    const content = 'Onzus Team'

    sendmail(req.body, subject, text, content, 'info@onzbus.com').catch(console.error); 

    console.log("Result: " + result);
  });

    res.status(200).json({success: 'ok'});
    
})


// @route   POST api/users/contact_email
// @desc    User will verify on this route
// @access  Public
// @parmas string email, string timestamp, string request_id, string password, string confirm_password


router.post('/contact_email', (req, res) => {

    // get password 
    const {email, person_name, email_message} = req.body;

    // Email address is required to update the password 

    if(typeof person_name === 'undefined' || person_name.length < 1) {

        return res.status(401).json({person_name: 'Please enter you name.'});
    }

    if(typeof email_message === 'undefined' || email_message.length < 2) {

        return res.status(401).json({email_message: 'Please write some message.'});
    }

    // check the email and password 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(email).toLowerCase())) {

        return res.status(401).json({email: 'Please enter valid email address'});
    }

     // Send mail 
    const users = req.body
    const subject = 'Message from client.';
    const text = 'A client try to contact onzbus';
    const content = `Client details <br/> Email Address: ${email} <br/> Person Name: ${person_name} <br/> Message: ${email_message}`;

    sendmail({email:'info@noosmall.com'}, subject, text, content).catch(console.error); 

    res.status(200).json({success: 'Email Recieved'});
    
})


async function sendmail(users, subject, text, content, sender){


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.gandi.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@noosmall.com', // generated ethereal user
      pass: '$QDC$12345678$' // generated ethereal password
    }
  });

  
  const host = 'localhost';
  const from = `Onzbus 👻"info@onzbus.com`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Onzbus " <info@onzbus.com>', // sender address
    to: users.email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: content
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}


module.exports = router; 