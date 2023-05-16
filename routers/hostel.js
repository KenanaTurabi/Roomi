const express=require('express')
const router=new express.Router()
const sequelize=require('sequelize')
const {Hostel,Investor, Student, Booking} = require('../models/connections')
const auth = require('../middleware/auth')
const fs = require("fs");


const Sequelize = require("sequelize");
const Op = Sequelize.Op;
router.post("/hostel/undoBooking",async (req,res)=>{
  try {
    const hostelId = req.body.hostelId;
    const studentId=req.body.studentId;
    console.log(hostelId);
    console.log(studentId);

    const hostel = await Hostel.findByPk(hostelId);
    const booked = await Booking.findOne({where:{hostelId,studentId}});

    if (!hostel) {
      return res.status(404).send({ error: 'Hostel not found' });
    }
    if (!booked) {
      return res.status(404).send({ error: 'No such booking' });
    }
    await booked.destroy();
    await Hostel.update({capacity:hostel.capacity+1},{where:{id:hostelId}})
    res.redirect(`../html/Myhostels.html?studentId=${studentId}`);
  } catch (e) {
      res.status(400).send(e)
  }
    
}
)

router.get('/filter/:val',async(req,res)=>{

try{
  
let hostels = await Hostel.findAll({
  
  
 where:{
  
 [Op.or]:[
 {hostel_name:req.params.val},
{hostel_location:req.params.val},
{hostel_price:parseFloat(req.params.val)},

 ],
   capacity: {[Op.gt]: 0},
  
}, //where
attributes:{exclude:['investorId']},
   })
  
res.send(hostels)
   }catch(e){
  
console.log(e)
  res.status(400).send(e)
  }
  

  })


  router.get('/hostels', async (req, res) => {
    try {
  
      let hostels = await Hostel.findAll({ where: { hostel_pending: false,capacity: {[Op.gt]: 0} }} )
  
      res.send(hostels)
  } catch (e) {
      res.status(400).send(e)
  }
  
  })


router.post('/hostels/showdetailsD', async (req, res) => {

   try {
  
  
  
let hostel = await Hostel.findAll({
  
 where: { id: req.body.id }
  
 })
  
 let investorId=hostel[0].investorId;
  
 let userData=
  
 await Investor.findOne({where: {id: investorId}})

 let username=userData.username;
  let investorid=userData.id;
 
   console.log(username)
   console.log(investorid)

  

  res.json({hostel,username,investorid})
  
 
  } catch (e) {
  
 res.status(400).send(e)
  
   }
  
  
  
  
  })

router.get('/hostels/:id',  async (req, res) => {
    try {

        let hostel = await Hostel.findOne({ where: { id: req.params.id}, attributes:
            {exclude:'pending_hostel'},
         include:[{model:Investor, attributes:['username','mobileNumber']}] 
        } )

         
            // hostel.setDataValue('hostel_image1', fs.readFileSync(hostel['hostel_image1']))
            // hostel.setDataValue('hostel_image2', fs.readFileSync(hostel['hostel_image2']))
            // hostel.setDataValue('hostel_image3', fs.readFileSync(hostel['hostel_image3']))
        

        res.send(hostel)
    } catch (e) {
        res.status(400).send(e)
    }

})


router.post("/hostel/add",async (req,res)=>{
  const hostel=new Hostel(req.body)
  try {
      await hostel.save()
        res.redirect(`../html/AddHostel_page.html?id=${hostel.investorId}`);

  } catch (e) {
      res.status(400).send(e)
  }
    
}
)





router.post('/hostel/delete', async (req, res) => {
    const id = req.body.hostel_id1;
    console.log(id);
  
    try {
      const hostel = await Hostel.findByPk(id);
      if (!hostel) {
        return res.status(404).send({ error: 'Hostel not found' });
      }
      await hostel.destroy();
    //  res.send('deleted succefully ');
    res.redirect(`../html/AddHostel_page.html?id=${hostel.investorId}`);

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  router.post('/hostel/update', async (req, res) => {
    const id = req.body.hostel_id;
    const {
      hostel_name,
      hostel_price,
      hostel_location,
      hostel_location_desc,
      hostel_desc,
      capacity,
      girls,
      hostel_image1,
      hostel_image2,
      hostel_image3
    } = req.body;
  
    try {
      const hostel = await Hostel.findByPk(id);
  
      if (!hostel) {
        return res.status(404).send({ error: 'Hostel not found' });
      }
  
      await hostel.update({
        hostel_name,
        hostel_price,
        hostel_location,
        hostel_location_desc,
        hostel_desc,
        capacity,
        girls,
        hostel_image1,
        hostel_image2,
        hostel_image3
      });
  
      res.redirect(`../html/InvestorHostel.html?var1=${hostel.hostel_name}&var2=${hostel.capacity}&var3=${hostel.hostel_location}&var4=${hostel.hostel_location_desc}&var5=${hostel.hostel_price}&var6=${hostel.hostel_decsc}&var7=${hostel.hostel_image1}&var8=${hostel.hostel_image2}&var9=${hostel.hostel_image3}&var10=${hostel.id}&var11=${hostel.girls}&var12=${hostel.investorId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while updating hostel information' });
    }
  });
  router.post('/hostels/showdetails', async (req, res) => {
    try {
      const hostel = await Hostel.findAll({
        where: { id: req.body.id },
      
      });
         
        res.json(hostel)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/counts/blocks',async(req,res)=>{
  try{

    const hostelCount = await Hostel.count({
      col: 'id',
    });

    const StudenCount = await Student.count({
      col: 'id',
    });

    const InvestorCount = await Investor.count({
      col: 'id',
    });

    const BookingsCount = await Booking.count({
      col: 'id',});

    const pendingHostelCount = await Hostel.count({
      col:'id',
      where:{hostel_pending: true }
    });
    const accepted = await Hostel.count({
      col:'id',
      where:{hostel_pending: false }
    });
    console.log(accepted);
   //res.send(hostelCount.toString()+" "+StudenCount.toString()+" "+InvestorCount.toString()+" "+pendingHostelCount.toString()+" "+BookingsCount.toString());
    res.json([{h_count:hostelCount,
       s_count:StudenCount,
       i_count:InvestorCount,
       b_count:BookingsCount,
       p_count:pendingHostelCount,
       np_count:accepted,
        }])

  }catch(e){
    res.status(400).send(e)
    console.log(e);
  }
})


router.post('/Investor/MyProfile',async(req,res)=>{
  try{
    const investor = await Investor.findAll({where:{id: req.body.id}
      
      })
console.log(investor.id);
    res.json(investor)

  }catch(e){
    console.log(e)
    res.status(400).send(e)
    

  }

})
router.post('/student/MyProfile',async(req,res)=>{
  try{
    const student = await Student.findAll({where:{id: req.body.id}
      
      })
    res.json(student)

  }catch(e){
    console.log(e)
    res.status(400).send(e)
    

  }

})
router.post('/bookings/hostelid', async (req, res) => {
  try {
    // ,include:[{model:Student,attributes:['id','username','email','mobileNumber','city']}]
  

    const bookings=await Booking.findAll({where:{hostelId: req.body.id}
    
    });
    console.log(req.body.id);
    console.log(bookings.hostelId);


    res.json(bookings)

  } catch (e) {
      res.status(400).send(e)
  }

})
router.post('/booking/cancel', async (req, res) => {
  const id1 = req.body.hostelId;
  const id2= req.body.studentId;
  const id3 = req.body.investorId;

  console.log(id1);
  console.log(req.body.investorId);
  try {
    const booking = await Booking.findOne( { where: { hostelId: id1 , studentId:id2} });
    if (!booking) {
      return res.status(404).send({ error: 'This booking not found!' });
    }
    await booking.destroy();
    hostelid=booking.hostelId;
    
    res.redirect(`../html/investor_bookings.html?id=${id1}&investorId=${id3}`);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
router.post('/student/bookedHostels',async(req,res)=>{
  try{
    let booking=await Booking.findAll({where:{studentId:req.body.studentId},attributes:{exclude:["hostelId","studentId","id"] },include  :[{ model:Hostel,attributes:{exclude:["hostel_pending"]} }]})
    res.send(booking)

  }catch(e){
  res.send(e)
  }
})
router.delete("/hostel/:hostelId/undoBooking",async (req,res)=>{
  try {
    const hostelId = req.params.hostelId;
    const {studentId}=req.body;
    const hostel = await Hostel.findByPk(hostelId);
    const booked = await Booking.findOne({where:{hostelId,studentId}});

    if (!hostel) {
      return res.status(404).send({ error: 'Hostel not found' });
    }
    if (!booked) {
      return res.status(404).send({ error: 'No such booking' });
    }
    await booked.destroy();
    await Hostel.update({capacity:hostel.capacity+1},{where:{id:hostelId}})
    res.status(200).send();
  } catch (e) {
      res.status(400).send(e)
  }
    
}
)


router.post("/hostel/:hostelId/booking",async (req,res)=>{
  try {

    let hostel = await Hostel.findByPk(req.params.hostelId);
    let booked = await Booking.findOne({where:{hostelId:req.params.hostelId,studentId:req.body.studentId}});

    console.log(req.body.studentId);
    console.log(req.params.hostelId);
let hostelId=req.params.hostelId;
let studentId=req.body.studentId;
    if (!hostel) {
      return res.status(404).send({ error: 'Hostel not found' });
    }
    if (booked) {

      return res.status(400).send({ error: 'You have already booked this hostel!' });
    }
    
else if(!booked){
  if(hostel.capacity>0){
    const booking = await Booking.create({
      hostelId,studentId
    });
   
    await Hostel.update({capacity:hostel.capacity-1},{where:{id:hostelId}})
    }
    res.status(201).send({
      booking
    });
  }

  } catch (e) {
      res.status(400).send(e)
  }
    
}
)

module.exports=router