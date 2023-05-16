const express = require("express");
const router = new express.Router();
const {
  Token,
  Student,
  Investor,
  Hostel,
  Admin,
  Booking,
} = require("../models/connections");
const auth = require("../middleware/auth");
const sequelize = require("sequelize");

router.post("/user/signup", async (req, res) => {
  res.header("Access-Control-Allow-Origin");

  const { username, email, password, role, mobileNumber, gender, city } = req.body;

  const existingUser = await (role === "student" ? Student : Investor).findOne({
    where: { email },
  });
  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const newUser = await (role === "student" ? Student : Investor).create({
    username,
    email,
    password,
    mobileNumber,
    gender,
    city,
  });

  const token = await newUser.generateAuthToken(role);
  res.status(201).send({ newUser, token });
  try {
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/myHostels", async (req, res) => {
  const hostels = await Hostel.findAll({
    where: { investorId: req.body.id },
    attributes: { exclude: "pending_hostel" },
  });

  // for(let i=0;i<hostels.length;i++){
  // hostels[i].setDataValue('hostel_image1', fs.readFileSync(hostels[i]['hostel_image1']))
  // hostels[i].setDataValue('hostel_image2', fs.readFileSync(hostels[i]['hostel_image2']))
  // hostels[i].setDataValue('hostel_image3', fs.readFileSync(hostels[i]['hostel_image3']))
  // }
  res.json(hostels);
});
router.post('/profile/update', async (req, res) => {
  const id = req.body.investorId;
  const {
   username,
   email,
   mobileNumber,
   city,
   img1
  
   
  } = req.body;

  try {
    const investor = await Investor.findByPk(id);
console.log(id);
console.log(username);
    if (!investor) {
      return res.status(404).send({ error: 'investor not found' });
    }

    await investor.update({

      username,
      email,
      mobileNumber,
      city,
      img1
     
      
    
   
    });
    console.log(id);
    res.redirect(`../html/investorProfile.html?id=${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating investor information' });
  }
});

router.post('/student_profile/update', async (req, res) => {
  const id = req.body.studentId;
  const {
   username,
   email,
   mobileNumber,
   city,
   img1
  
   
  } = req.body;

  try {
    const student = await Student.findByPk(id);
console.log(id);
console.log(username);
    if (!student) {
      return res.status(404).send({ error: 'student not found' });
    }

    await student.update({

      username,
      email,
      mobileNumber,
      city,
      img1
     
      
    
   
    });
    res.redirect(`../html/StudentProfile.html?id=${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating student information' });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });
    const investor = await Investor.findOne({ where: { email } });
    const admin = await Admin.findOne({ where: { email } });

    let user;
    if (student) {
      user = student;
    } else if (investor) {
      user = investor;
    } else if (admin) {
      user = admin;
    } else {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password)
      return res.status(401).json({ message: "Invalid login " });

    let userType, redirectUrl, userId;
    if (user instanceof Student) {
      userType = "student";
      redirectUrl = "ViewHostel.html";
    } else if (user instanceof Investor) {
      userType = "investor";
      redirectUrl = "../html/AddHostel_page.html";

    } else if (user instanceof Admin) {
      userType = "admin";
      redirectUrl = "";
    }
    const token = await user.generateAuthToken(userType);
    userId = user.id;
    console.log(userId);

    res.json({
      message: "Success",
      redirectUrl,
      userType,
      token,
      userId,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});


module.exports = router;
