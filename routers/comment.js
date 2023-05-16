const express =require('express')
const router=new express.Router()
const sequelize=require('sequelize')
const {Student,Comment}=require('../models/connections')



router.post('/hostel/comment',async(req,res)=>{
    try{
        // include:[{model:Student,attributes:['username'],where:{id:1}}]
    let comments=await Comment.findAll({where:{hostelId:req.body.id},include:[{model:Student,attributes:['username']}]});
    console.log(req.body.id);
        res.json(comments)

    }catch(e){
        res.status(400).send(e)
    }
})


router.post("/comment/add",async(req,res)=>{
    let comment=new Comment(req.body)
let sid=req.body.studentId;
let hid=req.body.hostelId;
    try{
        const date = new Date();

        let currentDay= String(date.getDate()).padStart(2, '0');
        
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        
        let currentYear = date.getFullYear();
        
        
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        comment.comment_DateTime=currentDate;
        await comment.save()
        res.redirect(`../html/comment_rate.html?var10=${hid}&var12=${sid}`);


    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
}
)
module.exports=router