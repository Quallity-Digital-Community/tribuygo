const mysql = require('mysql');

/* var connection = mysql.createConnection({
/*var connection = mysql.createConnection({
  host: "3.135.8.79",
  user: "qdcmedia",
  password: "qdcmedia",
  database:'onzbus',
  port: 3306
});*/

/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "ThisIsMyLife123",
  database:'onzbus',
  port: 3306
});
*/

var connection = mysql.createConnection({
  host: "localhost",
  user: "qdcuser",
  password: "qdcmedia",
  database:'onzbus',
  port: 3306
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected with mysql.");
  console.log("I am connected with mysql");
});

module.exports = connection;