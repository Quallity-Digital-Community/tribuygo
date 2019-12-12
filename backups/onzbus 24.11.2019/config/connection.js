const Sequelize = require('sequelize');

// initialze an instance of Sequelize
const sequelize = new Sequelize({
  database: 'onzbus',
  username: 'qdcuser',
  password: 'qdcmedia',
  dialect: 'mysql',
});
sequelize.authenticate().then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

  module.exports = sequelize;