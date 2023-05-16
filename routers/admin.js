const express = require('express')
const router = new express.Router()
const { Admin, Hostel, Investor, Student, Booking} = require('../models/connections')
const auth = require('../middleware/auth')



router.post('/requests',  async (req, res) => {
    try {

        let requests = await Hostel.findAll({ where: { hostel_pending: true }, include:[{model:Investor, attributes:{exclude:['id','password']}}] } )
        res.json(requests)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post("/requestsNotPend", async (req, res) => {
    try {

        let requests = await Hostel.findAll({ where: { hostel_pending: false }, include:[{model:Investor, attributes:{exclude:['id','password']}}] } )
        res.json(requests)
    } catch (e) {
        res.status(400).send(e)
    }

})



router.post("/requests/accept", async (req, res) => {
    try {

        await Hostel.update({ hostel_pending: false }, { where: { id: req.body.id } })

        // res.redirect(`../html/AdminHostel_pending.html`);
        res.redirect(`../html/AdminHostel_pending.html`);

    } catch (e) {
        res.status(400).send(e)
    }

})

router.post("/requests/deny", async (req, res) => {
    try {
        await Hostel.destroy({ where: { id: req.body.id } })
        res.redirect("../html/AdminHostel_pending.html");
    } catch (e) {
        res.status(400).send(e)
    }

})
router.post("/admin/investors", async (req, res) => {
    try {
      const investors = await Investor.findAll();
  
      if (investors.length === 0) {
        return res.status(404).send("No investors found");
      }
  
      res.json(investors);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  router.post("/admin/students", async (req, res) => {
    try {
      const students = await Student.findAll();
  
      if (students.length === 0) {
        return res.status(404).send("No students found");
      }
  
      res.send(students);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  router.post("/investors/delete", async (req, res) => {
    try {
      const investor = await Investor.findOne({ where: { id: req.body.id1 } });
  console.log(req.body.id1);
      if (!investor) {
        return res.status(404).send("Investor not found");
      }
  
      await investor.destroy();
  
      res.redirect("../html/viewinvestors.html");
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
  router.post("/students/delete", async (req, res) => {
    try {
      const student = await Student.findOne({ where: { id: req.body.id2 } });
  console.log(req.body.id2);
      if (!student) {
        return res.status(404).send("students not found");
      }
  
      await student.destroy();
  
      res.redirect("../Admin/Student.html");
    } catch (e) {
      res.status(400).send(e.message);
    }
  });


  router.post("/admin/investorId", async (req, res) => {
    const hostels = await Hostel.findAll({
      where: { investorId: req.body.id },
      attributes: { exclude: "pending_hostel" },
    });
  
    
    res.json(hostels);
  });

  router.post('/allhostels',  async (req, res) => {
    try {

        let allhostels = await Hostel.findAll( )
        res.json(allhostels)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/admin/bookings', async (req, res) => {
  try {
     let bookings=await Booking.findAll({exclude:['id','hostelId','studentId'],include:[{model:Hostel, attributes:['id','hostel_name']},{model:Student,attributes:['id','username','email','mobileNumber']}]})

     res.send(bookings)
     } catch (e) {
     res.status(400).send(e)
 }

})
module.exports = router
