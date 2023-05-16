const db=require('../db/sequelize').sequelize
const { INTEGER } = require('sequelize')
const sequelize=require('sequelize')
const Rating=db.define('rate',{
    rating_id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    // user_id:{
    //     type:sequelize.INTEGER,
    //     required:true,
    // },
    rating_val:{
        type: sequelize.INTEGER,
        required: true,

    }
},{
    createdAt: false,
    updatedAt:false,
    freezeTableName: true,
    hooks:{
        beforeCreate:async function(Rating){
            Rating.dataValues.rating_id=null
        }
    }

})
module.exports=Rating