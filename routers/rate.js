const express= require('express')
const router=new express.Router()
const sequelize=require('sequelize')
const {Student,Rating} = require('../models/connections')



router.post('/hostel/rate',async(req,res)=>{
    try{


    let Ratings=await Rating.findAll({where:{hostelId:req.body.id}})
        res.json(Ratings)

    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

router.post("/rating/add",async (req,res)=>{
    let rating=new Rating(req.body)
    let sid=req.body.studentId;
let hid=req.body.hostelId;
    try {
        await rating.save()
        res.redirect(`../html/comment_rate.html?var10=${hid}&var12=${sid}`);

    } catch (e) {
        res.status(400).send(e)
    }
      
}
)


module.exports=router