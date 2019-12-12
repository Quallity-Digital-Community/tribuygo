const express = require('express');
const userModel = require('../../models/users.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const router = express.Router();

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

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.get('/users', (req, res) =>{
    getAllUsers().then(user => res.json(user));
    });
    

    router.post('/signIn', async (req, res, next) => {
        const { email, password, deviceId, platform } = req.body;
        console.log(email);
        if (email && password) {
            let user = await getUser({ email: email });
            if (!user) {
            res.status(401).json({ message: 'No such user found' });
            }
            if (user.password === password) {
            // from now on we'll identify the user by the id and the id is the 
            // only personalized value that goes into our token
            let payload = { id: user.id };
            userModel.update({deviceId:deviceId, platform: platform}, {where:{id:user.id}});
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ msg: 'ok', token: token, roleId: user.roleId, userId: user.id, name: user.name });
            } else {
            res.status(401).json({ msg: 'Password is incorrect' });
            }
        }
    });
module.exports = router; 