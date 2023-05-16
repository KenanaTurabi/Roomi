

const display_hostelname=document.querySelector('#hostel_name');
const display_hosteldesc=document.querySelector('#hostel_price');
let hostel=document.getElementById("hostels");



fetch('https://roomi.azurewebsites.net/hostels',
{  withCredentials: true,    
  crossorigin: true,    
  mode: 'no-cors'
}
)
.then(res=>res.json())
.then(json=>{
   json.map(data=>{
    console.log(data)
    hostel.append(fun(data.hostel_name, data.hostel_image1,data.hostel_price));


})
})

function fun(hostel_name, hostel_image1,hostel_price){
    let d=document.createElement('hostels');
    d.innerHTML=
    `
    <div class="col-md-4 card" id="hostels">
    <a href="#">
  <div class="service-media"> <img src="${hostel_image1}" alt=" " id="img"> </div>
  <div class="service-desc">
   <h3><span id="hostel_name">${hostel_name}</span></h3>
    <span id="hostel_price"></span>${hostel_price}<span>₪/month</span>
    <button class="button">Details</button>
  </div>
    </a>
</div>
    `
    return d;
}




