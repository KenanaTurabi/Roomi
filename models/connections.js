//const User = require("../models/user.js")
//const Token=require('../models/token.js')
const Comment = require("../models/comments.js")
const Hostel = require("../models/hostel.js")
const Rating = require("../models/rating.js")
const Token=require('../models/token.js')
const Student = require("./student.js")
const Investor= require("../models/investor.js")
const Admin= require("../models/admin.js")
const Booking=require("../models/booking.js")
const Message = require("../models/message.js");
//user-token relationship
Student.hasMany(Token)
Token.belongsTo(Student, {
    foreignKey: "studentId"
})

Investor.hasMany(Token)
Token.belongsTo(Investor, {
    foreignKey: "investorId"
})

Admin.hasMany(Token)
Token.belongsTo(Admin, {
    foreignKey: "adminId"
})
//user-hostel relationship
Investor.hasMany(Hostel)
Hostel.belongsTo(Investor, {
    foreignKey: "investorId"
})

//student comment relationship

Student.hasMany(Comment)
Comment.belongsTo(Student, {
    foreignKey: "studentId"
})
 
//student rate relationship

Student.hasMany(Rating)
Rating.belongsTo(Student, {
    foreignKey: "studentId"
})

//hostel comments relationship
Hostel.hasMany(Comment)
Comment.belongsTo(Hostel, {
    foreignKey: "hostelId"
})

//hostel rate relatioship
Hostel.hasMany(Rating)
Rating.belongsTo(Hostel, {
    foreignKey: "hostelId"
})


//student-hostel-booking relationship
Hostel.hasMany(Booking);
Booking.belongsTo(Hostel);
Student.hasMany(Booking);
Booking.belongsTo(Student);



Investor.hasMany(Message);
Student.hasMany(Message);

Message.belongsTo(Investor, { foreignKey: "investorId" });
Message.belongsTo(Student, { foreignKey: "studentId" });

const syncModels=async()=>{
  await Student.sync()
  await Investor.sync()
  await Admin.sync()
  await Token.sync()
  await Hostel.sync()
  await Comment.sync()
  await Rating.sync()
  await Booking.sync()
  await Message.sync();
}

syncModels();

module.exports = { Token,Hostel,Comment,Rating,Student,Investor,Admin, Booking, Message,};
