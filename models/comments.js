const db =require('../db/sequelize').sequelize
const sequelize=require('sequelize')
const Comment=db.define('comment',{
    coment_id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },

    coment_content:{
        type:sequelize.STRING,
        required: true,
    },

    // user_id:{
    //     type:sequelize.INTEGER,
    //     required: true,
    // },
    comment_DateTime:{
        type:sequelize.STRING,
        required: true,
    },
    


},{

        createdAt:false,
        updatedAt:false,
        freezeTableName: true,



        hooks: {
            beforeCreate: async function (Comment) {
                Comment.dataValues.coment_id = null
             
            }
        }
}

)
module.exports=Comment
