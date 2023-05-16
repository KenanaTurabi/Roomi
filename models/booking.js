const db=require('../db/sequelize').sequelize
const sequelize=require('sequelize')
// const generateAuthToken = require('../')



const Booking=db.define('booking', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentId:{

      type: sequelize.INTEGER,
      foreignKey: true


    },


  }, {
    createdAt:false,
    updatedAt:false,
    //freezeTableName: true,
    hooks: {
        beforeCreate: async function (booking) {
            booking.dataValues.id = null
         
        }
    }
  })




// sequelize.Model.prototype.generateAuthToken = generateAuthToken



module.exports = Booking
