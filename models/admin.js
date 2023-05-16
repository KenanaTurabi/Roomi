const sequelize=require('sequelize')
const db=require('../db/sequelize').sequelize
const generateAuthToken = require('../utilities/generateToken')



const Admin=db.define('admin', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize.STRING,
        unique: true,
        required: true,
    },
    email: {
        type: sequelize.STRING,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: sequelize.STRING,
        required: true,
    },
    mobileNumber:{
        type: sequelize.INTEGER,
        unique: true,
    },

    gender:{
        type: sequelize.STRING

    },



  }, {
    createdAt:false,
    updatedAt:false,
    //freezeTableName: true,
    hooks: {
        beforeCreate: async function (admin) {
            admin.dataValues.id = null
         
        }
    }
  })




sequelize.Model.prototype.generateAuthToken = generateAuthToken



module.exports = Admin
