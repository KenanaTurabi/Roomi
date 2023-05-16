const sequelize=require('sequelize')
const db=require('../db/sequelize').sequelize
const jwt = require('jsonwebtoken')
const Token = require('./token')



const User=db.define('user', {
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

    role:{
        type: sequelize.STRING,
        required: true,
    },
    gender:{
        type: sequelize.STRING

    },
    city:{
        type: sequelize.STRING,
    },
    img1:{
        type: sequelize.STRING

    },



  }, {
    createdAt:false,
    updatedAt:false,
    //freezeTableName: true,
    hooks: {
        beforeCreate: async function (user) {
            user.dataValues.id = null
         
        }
    }
  })




sequelize.Model.prototype.generateAuthToken = async function(){
    const user=this
    const token=jwt.sign({ _id: user.id.toString() }, 'thisisRoomiProject')
    await user.save()
    const userToken = new Token({ token,userId: user.id  })
    await userToken.save()
    return token

}



module.exports = User
