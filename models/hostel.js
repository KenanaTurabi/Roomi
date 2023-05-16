const db=require('../db/sequelize').sequelize
const sequelize=require('sequelize')


    const Hostel=db.define('hostel',{
        id:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        hostel_name: {
            type: sequelize.STRING,
            required: true,
        },
        hostel_decsc: {
            type: sequelize.STRING,
            required: true,
        },
        hostel_location: {
            type: sequelize.STRING,
            required: true,
        },
        hostel_location_desc: {
            type: sequelize.STRING,
            required: true,
        },
        hostel_price: {
            type: sequelize.FLOAT,
            required: true,
        },
        hostel_image1:{
            type: sequelize.STRING,
            required: true,
        },
        hostel_image2:{
            type: sequelize.STRING,
            required: true,
        },
        hostel_image3:{
            type: sequelize.STRING,
            required: true,
        },
        hostel_pending:{
            type:sequelize.BOOLEAN,
            required: true,
        },
         girls:{
            type:sequelize.BOOLEAN
        
        },
        capacity:{
            type: sequelize.INTEGER,
            
        },

    },{
        createdAt:false,
        updatedAt:false,
        freezeTableName: true,

       


        hooks: {
            beforeCreate: async function (Hostel) {
                Hostel.dataValues.hostel_id = null
                Hostel.dataValues.hostel_pending=true
             
            }
        }
      })
    module.exports=Hostel
