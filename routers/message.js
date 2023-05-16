const express = require("express");
const Sequelize = require("sequelize");
const app = new express.Router();
const { Hostel, Investor, Student, Message } = require("../models/connections");
const bodyParser = require("body-parser");
const Op = Sequelize.Op;

app.post("/message/add", async (req, res) => {
  let id;
  const message = new Message();
  try {
    if (req.body.investorEmail) {
      let investor = await Investor.findOne({where:{ email: req.body.investorEmail}
      });
      if (!investor) {
        throw new Error("Investor email not found");
      }
      console.log(req.body.studentId)
      console.log("--------------------")
      console.log(id)

      message.investorId =investor.id;

    id=req.body.studentId;
   message.studentId =id;
   message.body = req.body.body;

    const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();


let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
message.Message_DateTime=currentDate;
    await message.save();
    // res.status(201).send({ message });
    res.redirect(`../html/inbox_student.html?studentId=${id}`);

    
    }
    if (req.body.studentEmail) {
      let student = await Student.findOne({ where:{email: req.body.studentEmail}});
      if (!student) {
        throw new Error("Student email not found");
      }
      message.studentId =student.id;
   
id=req.body.investorId;
message.investorId=id;
message.body = req.body.body;

    const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();


let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
message.Message_DateTime=currentDate;
    await message.save();
    // res.status(201).send({ message });
    res.redirect(`../html/Inbox.html?investorId=${id}`);


    }
    
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

app.post("/message", async (req, res) => {
  try {

if(req.body.investorId){


    let message = await Message.findAll({ where: {
        [Op.or]: [{ investorId: req.body.investorId }],
      },include:[{model:Student, attributes:{exclude:['id','password']}}]
      
    });
    console.log(req.body.investorId);
    res.json(message);
  }
  if(req.body.id){


    let message = await Message.findAll({ where: {
        [Op.or]: [{ studentId: req.body.id }],
      },include:[{model:Investor, attributes:{exclude:['id','password']}}]
      
    });
    console.log(req.body.id);
    res.json(message);
  }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = app;
