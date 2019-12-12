require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/connection');
const users = require('./routes/api/users.js');
const schools = require('./routes/api/schools.js');
const seedDb = require('./routes/api/createAndSeed.js');


const app = express();
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use('/api/schools', schools);
//app.use('api/seedDb', seedDb);    
   




const port = process.env.PORT || 5000;
var server = app.listen(port, () =>
    console.log(`OnzBus running on port : ${port}`)
  );
 
module.exports = server;