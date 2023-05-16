const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('roomi_db', 'myadmin', 'Digital@2019', {
    host: 'roomi.mysql.database.azure.com',
    dialect:  'mysql' 
  });

try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
}



module.exports={sequelize}